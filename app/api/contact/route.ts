import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  correo?: unknown;
  asunto?: unknown;
  mensaje?: unknown;
};

const readString = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);

const buildEmailHtml = (correo: string, asunto: string, mensaje: string) => {
  const safeCorreo = escapeHtml(correo);
  const safeAsunto = escapeHtml(asunto || "Sin asunto");
  const safeMensaje = escapeHtml(mensaje).replace(/\r?\n/g, "<br>");

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#040a1e;">
    <div style="background:#040a1e;padding:34px 14px;">
      <div style="max-width:580px;margin:0 auto;background:#e8002d;padding:8px 0 0 8px;clip-path:polygon(12px 0,100% 0,calc(100% - 10px) 100%,0 100%);">
        <div style="background:#0a0f1c;border:1px solid #24445c;padding:26px 26px 24px;clip-path:polygon(12px 0,100% 0,calc(100% - 10px) 100%,0 100%);box-shadow:0 10px 30px rgba(0,0,0,0.6);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="46" valign="middle" style="width:46px;">
                <div style="width:40px;height:40px;background:#e8002d;clip-path:polygon(14% 0,100% 0,86% 100%,0 100%);text-align:center;line-height:40px;font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:20px;color:#ffffff;">@</div>
              </td>
              <td valign="middle">
                <div style="font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:28px;line-height:1;letter-spacing:2px;color:#f6fbff;transform:skewX(-9deg);">CONTACTAME</div>
                <div style="width:54px;height:3px;background:#e8002d;margin-top:8px;transform:skewX(-9deg);"></div>
              </td>
            </tr>
          </table>

          <div style="height:1px;background:#24445c;margin:18px 0 20px;"></div>
          <div style="font-family:'Arial Narrow',Arial,sans-serif;font-size:12px;letter-spacing:3px;color:#8df6ff;margin-bottom:16px;">// NUEVO MENSAJE RECIBIDO</div>

          <div style="margin-bottom:14px;">
            <div style="font-family:'Arial Narrow',Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#a9c8de;margin-bottom:6px;">TU CORREO</div>
            <div style="background:#060c26;border:1px solid #2a5f70;padding:12px 14px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#f6fbff;word-break:break-all;">${safeCorreo}</div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="font-family:'Arial Narrow',Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#a9c8de;margin-bottom:6px;">ASUNTO</div>
            <div style="background:#060c26;border:1px solid #2a5f70;padding:12px 14px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#f6fbff;">${safeAsunto}</div>
          </div>

          <div style="margin-bottom:20px;">
            <div style="font-family:'Arial Narrow',Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#a9c8de;margin-bottom:6px;">MENSAJE</div>
            <div style="background:#060c26;border:1px solid #2a5f70;border-left:4px solid #e8002d;padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#f6fbff;">${safeMensaje}</div>
          </div>

          <div style="background:#c4001a;padding:13px 16px;text-align:center;clip-path:polygon(12px 0,100% 0,calc(100% - 12px) 100%,0 100%);font-family:'Arial Narrow',Arial,sans-serif;font-size:16px;letter-spacing:3px;color:#ffffff;">MENSAJE RECIBIDO</div>

          <div style="margin-top:16px;text-align:right;font-family:'Arial Narrow',Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#6f88a8;">P3R // CONTACT SYSTEM</div>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const correo = readString(payload.correo, 254);
  const asunto = readString(payload.asunto, 120).replace(/[\r\n]+/g, " ");
  const mensaje = readString(payload.mensaje, 5000);

  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !mensaje) {
    return Response.json({ error: "Revisa los campos del formulario" }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? user;

  if (!host || !user || !pass || !to) {
    return Response.json({ error: "Correo no configurado" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    requireTLS: process.env.SMTP_SECURE !== "true",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portafolio" <${user}>`,
      to,
      replyTo: correo,
      subject: `Contacto desde portafolio — ${asunto || "Sin asunto"}`,
      text: [
        `Correo: ${correo}`,
        `Asunto: ${asunto || "Sin asunto"}`,
        "",
        mensaje,
      ].join("\n"),
      html: buildEmailHtml(correo, asunto, mensaje),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "No se pudo enviar el correo" }, { status: 500 });
  }
}
