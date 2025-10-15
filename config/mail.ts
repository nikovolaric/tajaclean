import { createTransport, SendMailOptions, TransportOptions } from "nodemailer";
import isEmail from "validator/lib/isEmail";

const transporterOptions = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
} as TransportOptions;

export async function sendConfirmOrder(options: {
  orderId: string;
  buyer: { name: string; mail: string };
  date: string;
  totalPrice: number;
  paymentMethod: string;
  cart: {
    name: string;
    quantity: number;
    price: number;
    discountPrice?: number;
    packQ: number;
  }[];
  deliveryCost: number;
  code?: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: `TajaClean.si <${process.env.EMAIL_USERNAME}>`,
    to: options.buyer.mail,
    subject: `Potrditev naročila ${options.orderId} | TajaClean.si`,
    html: `
<html lang="sl">
  <head>
    <meta charset="UTF-8" />
    <title>Potrditev naročila</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #333333;
        font-size: 20px;
        margin-top: 0;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .info, .footer {
        margin-top: 20px;
        color: #555555;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        font-size: 14px;
      }
      table th, table td {
        border: 1px solid #dddddd;
        padding: 10px;
        text-align: left;
        word-break: break-word;
      }
      .total {
        font-weight: bold;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        border-width:0;
        cursor: pointer;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      @media only screen and (max-width: 480px) {
        .container {
          padding: 15px;
        }
        table th, table td {
          padding: 8px;
          font-size: 13px;
        }
        .btn {
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hvala za vaše naročilo, ${options.buyer.name}!</h2>
      <p class="info">
        Prejeli smo vaše naročilo št. <strong>${options.orderId}</strong> z dne
        <strong>${new Date(options.date).toLocaleDateString("sl-SI", { day: "2-digit", month: "2-digit", year: "numeric" })}</strong>.
      </p>

      ${options.paymentMethod === "proforma" ? `<p>Ker ste se odločili za plačilo po predračunu, prosimo, da znesek nakažete na podatke za plačilo spodaj. Za sklic uporabite št. naročila <strong>${options.orderId}</strong>.</p>` : ""}
    
      <table>
        <thead>
          <tr>
            <th>Izdelek</th>
            <th>Količina</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
         ${options.cart
           .map((article) => {
             return `<tr>
            <td>${article.name} - ${article.packQ} ${article.packQ === 3 ? "krpice" : "krpic"}</td>
            <td>${article.quantity}</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(article.price * article.quantity)}</td>
          </tr>`;
           })
           .join("")}
         <tr>
            <td>Dostava</td>
            <td>1</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(options.deliveryCost)}</td>
          </tr>
            ${
              options.code
                ? `<tr>
            <td>Koda za popust ${options.code}</td>
            <td>1</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              options.cart.reduce((c, a) => c + a.discountPrice!, 0) -
                options.cart.reduce((c, a) => c + a.price!, 0),
            )}</td>
            </tr>  
            `
                : ""
            }     
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">DDV:</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(0)}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Za plačilo:</strong></td>
            <td><strong>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(options.totalPrice)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <p class="info">
        Način plačila: ${options.paymentMethod === "proforma" ? "Predračun" : options.paymentMethod === "paypal" ? "PayPal" : options.paymentMethod === "povzetje" ? "Po povzetju" : "Spletno plačilo"}<br />
        Način dostave: Pošta Slovenije
      </p>

      ${
        options.paymentMethod === "proforma"
          ? `<p>
        <strong>Podatki za plačilo</strong><br/>
        ANINEO, spletna prodaja, d.o.o<br/>
        Trške gorce 1, 3252 Rogatec<br/>
        IBAN SI56 6100 0002 9765 088
      </p>`
          : ""
      }

      <p class="footer">
        Hvala za zaupanje!<br />
        TajaClean<br />
        <small>anja@tajaclean.si | +386 40 306 996</small>
      </p>
    </div>
  </body>
</html>
`,
  } as SendMailOptions;

  if (!isEmail(options.buyer.mail)) {
    return;
  }

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res;
}

export async function sendNewOrderNotice(options: {
  orderId: string;
  buyer: {
    name: string;
    mail: string;
    address: string;
    city: string;
    postal: string;
    phone: string;
    company: string;
  };
  delivery: {
    name: string;
    mail: string;
    address: string;
    city: string;
    postal: string;
    phone: string;
  };
  date: string;
  totalPrice: number;
  paymentMethod: string;
  cart: {
    name: string;
    quantity: number;
    price: number;
    discountPrice?: number;
    packQ: number;
  }[];
  deliveryCost: number;
  code?: string;
  notes?: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: `TajaClean.si <${process.env.EMAIL_USERNAME}>`,
    to: process.env.EMAIL_USERNAME,
    // to: "niko.volaric@gmail.com",
    subject: `Novo naročilo ${options.orderId} | TajaClean.si`,
    html: `
<html lang="sl">
  <head>
    <meta charset="UTF-8" />
    <title>Potrditev naročila</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #333333;
        font-size: 20px;
        margin-top: 0;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .info, .footer {
        margin-top: 20px;
        color: #555555;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        font-size: 14px;
      }
      table th, table td {
        border: 1px solid #dddddd;
        padding: 10px;
        text-align: left;
        word-break: break-word;
      }
      .total {
        font-weight: bold;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        border-width:0;
        cursor: pointer;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      @media only screen and (max-width: 480px) {
        .container {
          padding: 15px;
        }
        table th, table td {
          padding: 8px;
          font-size: 13px;
        }
        .btn {
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Prejeli ste novo naročilo!</h2>
      <p class="info">
        Prejeli ste naročilo št. <strong>${options.orderId}</strong> z dne
        <strong>${new Date(options.date).toLocaleDateString("sl-SI", { day: "2-digit", month: "2-digit", year: "numeric" })}</strong>.
      </p>

      <p>
        <strong>Podatki za račun</strong><br/>
        ${options.buyer.company ? options.buyer.company : options.buyer.name}<br/>
        ${options.buyer.address}<br/>
        ${options.buyer.postal}, ${options.buyer.city}<br/>
        ${options.buyer.phone}<br/>
        <a href="mailto:${options.buyer.mail}">${options.buyer.mail}</a>
      </p>
      ${
        options.buyer.address !== options.delivery.address
          ? `<p>
        <strong>Podatki za dostavo</strong><br/>
        ${options.delivery.name}<br/>
        ${options.delivery.address}<br/>
        ${options.delivery.postal}, ${options.delivery.city}<br/>
      </p>`
          : ""
      }
    
      <table>
        <thead>
          <tr>
            <th>Izdelek</th>
            <th>Količina</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
         ${options.cart
           .map((article) => {
             return `<tr>
            <td>${article.name} - ${article.packQ} ${article.packQ === 3 ? "krpice" : "krpic"}</td>
            <td>${article.quantity}</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(article.price * article.quantity)}</td>
          </tr>`;
           })
           .join("")}
         <tr>
            <td>Dostava</td>
            <td>1</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(options.deliveryCost)}</td>
          </tr>   
          ${
            options.code
              ? `<tr>
            <td>Koda za popust ${options.code}</td>
            <td>1</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              options.cart.reduce(
                (c, a) => c + a.discountPrice! * a.quantity,
                0,
              ) - options.cart.reduce((c, a) => c + a.price! * a.quantity, 0),
            )}</td>
            </tr>  
            `
              : ""
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">DDV:</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(0)}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Za plačilo:</strong></td>
            <td><strong>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(options.totalPrice)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <p class="info">
        Način plačila: ${options.paymentMethod === "proforma" ? "Predračun" : options.paymentMethod === "paypal" ? "PayPal" : options.paymentMethod === "povzetje" ? "Po povzetju" : "Spletno plačilo"}<br />
        Način dostave: Pošta Slovenije
      </p>

      ${options.notes ? `<p class="info"><strong>Opombe:</strong> ${options.notes}</p>` : ""}

      <p class="footer">
        Hvala za zaupanje!<br />
        TajaClean<br />
        <small>anja@tajaclean.si | +386 40 306 996</small>
      </p>
    </div>
  </body>
</html>
`,
  } as SendMailOptions;

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}

export async function sendEnquiry(options: {
  name: string;
  email: string;
  message: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: `TajaClean.si <${process.env.EMAIL_USERNAME}>`,
    to: process.env.EMAIL_USERNAME,
    // to: "niko.volaric@gmail.com",
    subject: "Povpraševanje",
    html: `<div style='font-family:Verdana'>Ime in priimek:${
      options.name
    }<br/>Mail:${options.email}
    <br/><br/>${options.message.replaceAll("\r\n", "<br/>")}`,
  };

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}

export async function sendTrackingNumber(options: {
  buyer: {
    firstName: string;
    email: string;
  };
  trackingNo: string;
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: `TajaClean.si <${process.env.EMAIL_USERNAME}>`,
    to: options.buyer.email,
    // to: "niko.volaric@gmail.com",
    subject: `Sledenje naročilu | TajaClean.si`,
    html: `
<html lang="sl">
  <head>
    <meta charset="UTF-8" />
    <title>Potrditev naročila</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <body>
    <div>Pozdravljeni ${options.buyer.firstName},<div><br></div>
  <div>čudežne krpice <b>TajaClean </b>smo danes odposlali in so že na poti k vam.&nbsp;</div>
  <div><br>Svoj paket lahko spremljate s sledilno številko&nbsp;<b>${options.trackingNo}&nbsp;</b>na povezavi:&nbsp;<a href="https://moja.posta.si/tracking" target="_blank" title="https://moja.posta.si/tracking">https://moja.posta.si/tracking</a>&nbsp;.&nbsp;</div>
  <div><br></div>
  <div>Naj vam dobro služijo!</div>
  <div><br></div>
  <div>Lep dan</div>
  <div>Anja</div>
  <div><br></div>
  <div>
    <table style="border:none;border-collapse:collapse">
      <tbody>
        <tr style="height:90pt">
          <td style="border-right:1.5pt solid rgb(0,0,0);vertical-align:top;padding:0pt 12pt 0pt 0pt;overflow:hidden">
            <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Arial;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:120px;height:120px"><a href="http://www.tajaclean.com/" target="_blank" title="http://www.tajaclean.com/"><img alt="Logo" src="https://lh3.googleusercontent.com/AM1zsKnY-XDw6C27j3Z6r9G6A2UzEnv3vJ05HDatT9NRWfZESI7GUmcq0e69hbqwkALLkiKyFituL-a51MeOnG605WBvkeD0W-W_6aBK8V8cuLeomMxKiy_jp2iJOclCuOM-OPo_" width="120" height="120" class="gmail-CToWUd" style="margin-left: 0px; margin-top: 0px; max-width: 100vw; max-height: 100vw;"></a></span></span></p>
          </td>
          <td style="border-left:1.5pt solid rgb(0,0,0);vertical-align:top;padding:0pt 0pt 0pt 12pt;overflow:hidden">
            <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:9pt;font-family:Arial;color:rgb(103,153,119);background-color:transparent;font-weight:700;vertical-align:baseline">T:</span><span style="font-size:9pt;font-family:Arial;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline">&nbsp;+386 (0) 40 306 996&nbsp;</span><span style="font-size:11pt;font-family:Roboto,sans-serif;background-color:transparent;vertical-align:baseline"> </span></p>
            <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:9pt;font-family:Arial;color:rgb(103,153,119);background-color:transparent;font-weight:700;vertical-align:baseline">E:</span><span style="font-size:9pt;font-family:Arial;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline">&nbsp;<a href="mailto:anja@tajaclean.si" target="_blank" title="mailto:anja@tajaclean.si">anja@tajaclean.si</a>&nbsp;</span><span style="font-size:11pt;font-family:Roboto,sans-serif;background-color:transparent;vertical-align:baseline">  </span></p>
            <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:9pt;font-family:Arial;color:rgb(103,153,119);background-color:transparent;font-weight:700;vertical-align:baseline">S:</span><span style="font-size:9pt;font-family:Arial;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline">&nbsp;</span><a href="http://www.tajaclean.com/" target="_blank" title="http://www.tajaclean.com/"><span style="font-size:9pt;font-family:Arial;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline">www.tajaclean.com</span></a></p><br>
            <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:9pt;font-family:Arial;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline">Anineo d.o.o, Trške gorce 1, 3252 Rogatec</span></p><br>
            <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:11pt;font-family:Roboto,sans-serif;background-color:transparent;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:24px;height:24px"><a href="https://www.facebook.com/tajaclean" target="_blank" title="https://www.facebook.com/tajaclean"><img alt="Facebook icon" src="https://lh6.googleusercontent.com/LIRJIrbWszhRZxmTBaT15eocGgz6hSgs86zlsEaRMA1KTeZmj_R8G_KANtsti6D4vRk4OLKCVZehFupB66FxZMYEEII_byz39k9rh8I5ePrlJywlrg8jwqXV4R_5K5ehOIo0Ymkp" width="24" height="24" class="gmail-CToWUd" style="margin-left: 0px; margin-top: 0px; max-width: 100vw; max-height: 100vw;"></a></span></span><span style="font-size:11pt;font-family:Roboto,sans-serif;background-color:transparent;vertical-align:baseline">&nbsp;</span><span style="font-size:11pt;font-family:Roboto,sans-serif;background-color:transparent;vertical-align:baseline"><span style="border:none;display:inline-block;overflow:hidden;width:24px;height:24px"><a href="https://www.instagram.com/tajaclean/" target="_blank" title="https://www.instagram.com/tajaclean/"><img alt="Instagram icon" src="https://lh6.googleusercontent.com/StL03hm81uDl0qTTLLfrtfy5zquRRGbJso00fyKbHgE151qCAWok2_WaFMo1z9ybzr4AD2QDX4aevvHr1c7VzxyJ2zBQmIDaaY0LYTRjrDvBs7vljlADH9SfRiaiwhUJ0VqOsFq4" width="24" height="24" class="gmail-CToWUd" style="margin-left: 0px; margin-top: 0px; max-width: 100vw; max-height: 100vw;"></a></span></span><span style="font-size:11pt;font-family:Roboto,sans-serif;background-color:transparent;vertical-align:baseline">&nbsp;</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  </body>
</html>
`,
  } as SendMailOptions;

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}
