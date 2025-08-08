function OrderInfo({
  cart,
  totalPrice,
  discount,
}: {
  cart: {
    name: string;
    price: number;
    quantity: number;
    discountPrice?: number;
    id: string;
  }[];
  totalPrice: number;
  discount?: { name: string; value: number };
}) {
  const discountValue = discount
    ? new Intl.NumberFormat("sl-SI", {
        style: "currency",
        currency: "EUR",
      }).format(
        cart.reduce((c, a) => c + a.price * discount.value * a.quantity, 0),
      )
    : 0;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Podrobnosti o naročilu</p>
      <NameBar />
      {cart.map((article) => (
        <ArticleCard article={article} key={article.name} />
      ))}
      {discount && (
        <div className="grid grid-cols-[7fr_3fr_3fr_3fr_3fr] rounded-xl bg-white p-5 text-sm font-semibold shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="col-span-4">Koda za popust: {discount.name}</p>
          <p className="text-center">-{discountValue}</p>
        </div>
      )}
      <div className="grid grid-cols-[7fr_3fr_3fr_3fr_3fr] rounded-xl border border-red-500 bg-white p-5 text-sm font-semibold shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        <p className="col-span-4 font-semibold">Skupaj za plačilo:</p>
        <p className="text-center font-bold">
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(totalPrice)}
        </p>
      </div>
    </div>
  );
}

function NameBar() {
  return (
    <div className="grid grid-cols-[7fr_3fr_3fr_3fr_3fr] text-sm">
      <p className="w-full rounded-s-lg border border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
        Ime artikla
      </p>
      <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm"></p>
      <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
        Cena artikla
      </p>
      <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
        Količina
      </p>
      <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
        Skupni znesek
      </p>
    </div>
  );
}

function ArticleCard({
  article,
}: {
  article: {
    name: string;
    price: number;
    quantity: number;
    id: string;
    discountPrice?: number;
  };
}) {
  return (
    <div className="grid grid-cols-[7fr_3fr_3fr_3fr_3fr] rounded-xl bg-white p-5 text-sm shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
      <p className="font-medium">{article.name}</p>
      <p className="text-center font-medium"></p>
      <p className="text-center font-medium">
        {new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(article.price)}
      </p>
      <p className="text-center">{article.quantity}</p>
      <p className="text-center font-semibold">
        {new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(article.price * article.quantity)}
      </p>
    </div>
  );
}

export default OrderInfo;
