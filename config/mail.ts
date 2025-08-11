import { createTransport, SendMailOptions, TransportOptions } from "nodemailer";

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
  }[];
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: "TajaClean.si <info@lamastrategies.com>",
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

      ${options.paymentMethod === "proforma" ? `<p>Ker ste se odločili za plačilo po predračunu, prosimo, da znesek nakažete na podatkee za plačilo spodaj. Za sklic uporabite št. naročilo <strong>${options.orderId}</strong>.</p>` : ""}
    
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
            <td>${article.name}</td>
            <td>${article.quantity}</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              article.discountPrice
                ? article.discountPrice * article.quantity
                : article.price * article.quantity,
            )}</td>
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
            }).format(3.2)}</td>
          </tr>     
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
        Način plačila: ${options.paymentMethod === "proforma" ? "Predračun" : options.paymentMethod === "paypal" ? "PayPal" : "Spletno plačilo"}<br />
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

  //3. Actually send the email
  const res = await transporter.sendMail(mailOptions);

  return res.response;
}

export async function sendNewOrderNotice(options: {
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
  }[];
}) {
  //1. Create transporter
  const transporter = createTransport(transporterOptions);

  //2. Define the email options
  const mailOptions = {
    from: "TajaClean.si <info@lamastrategies.com>",
    to: "niko.volaric@gmail.com",
    subject: `Novo naročilo ${options.orderId} | TajaClean.si`,
    html: `
<html lang="sl">
  <head>
    <meta charset="UTF-8" />
    <title>Novo naročilo</title>
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
      <h2>Novo naročilo od ${options.buyer.name}!</h2>
      <p class="info">
        Novo naročilo št. <strong>${options.orderId}</strong> je bilo ustvarjeno dne
        <strong>${new Date(options.date).toLocaleDateString("sl-SI", { day: "2-digit", month: "2-digit", year: "numeric" })}</strong>.
      </p>
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
            <td>${article.name}</td>
            <td>${article.quantity}</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              article.discountPrice
                ? article.discountPrice * article.quantity
                : article.price * article.quantity,
            )}</td>
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
            }).format(3.2)}</td>
          </tr>     
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">DDV:</td>
            <td>${new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(options.totalPrice - options.totalPrice / 1.22)}</td>
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
        Način plačila: ${options.paymentMethod}<br />
        Način dostave: Pošta Slovenije
      </p>
      <a href=${process.env.API_URL}/admin/narocila class="btn">Oglej si naročilo</a>
      <p class="footer">
        Vsa naročila si lahko ogledaš v svoji skrbniški konzoli.
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
