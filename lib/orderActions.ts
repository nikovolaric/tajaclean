"use server";

import {
  sendConfirmOrder,
  sendNewOrderNotice,
  sendTrackingNumber,
} from "@/config/mail";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function createOrder({
  buyer,
  delivery,
  cart,
  paymentMethod,
  subscribe,
  code,
  notes,
  code_value,
  paid,
  sumup_id,
}: {
  buyer: Record<string, string>;
  delivery: Record<string, string>;
  cart: {
    id: string;
    img: string;
    name: string;
    packQ: number;
    price: number;
    quantity: number;
    discountPrice?: number;
  }[];
  paymentMethod: string;
  subscribe: boolean;
  code?: string;
  notes?: string;
  code_value?: number;
  paid: string;
  sumup_id?: string;
}) {
  try {
    if (!buyer.firstName || !buyer.lastName || !buyer.email) {
      throw new Error("Podatki o kupcu niso vnešeni!");
    }

    const updatedCart = cart.map((i) => {
      return {
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        discountPrice: i.discountPrice,
        packQ: i.packQ,
      };
    });
    const total = parseFloat(
      cart
        .reduce(
          (c, a) =>
            c +
            (a.discountPrice
              ? a.discountPrice * a.quantity
              : a.price * a.quantity),
          0,
        )
        .toFixed(2),
    );

    function generateTotalPrice() {
      if (paymentMethod === "povzetje" && total < 40) {
        return total + 5.5;
      }
      if (paymentMethod !== "povzetje" && total < 40) {
        return total + 3.2;
      }
      return total;
    }

    function generateDelivery() {
      if (paymentMethod === "povzetje" && total < 40) {
        return 5.5;
      }
      if (paymentMethod !== "povzetje" && total < 40) {
        return 3.2;
      }
      return 0;
    }

    const body = {
      buyer,
      delivery,
      cart: updatedCart,
      payment_method: paymentMethod,
      total_price: generateTotalPrice(),
      subscribe,
      status: "Nepregledano",
      code,
      notes,
      code_value,
      paid,
      sumup_id,
    };

    const { error, data } = await supabase
      .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
      .insert(body)
      .select();

    if (error) {
      throw error;
    }

    if (code)
      await supabase.rpc("increment", { x: 1, p_name: code.toUpperCase() });

    if (subscribe) {
      await fetch("https://api.sender.net/v2/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDER_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: buyer.email }),
      });
    }

    await sendConfirmOrder({
      orderId: String(data[0].id),
      buyer: { name: buyer.firstName, mail: buyer.email },
      date: new Date().toString(),
      totalPrice: generateTotalPrice(),
      cart: updatedCart,
      paymentMethod,
      deliveryCost: generateDelivery(),
      code,
    });

    await sendNewOrderNotice({
      orderId: String(data[0].id),
      buyer: {
        name: `${buyer.firstName} ${buyer.lastName}`,
        mail: buyer.email,
        address: buyer.address,
        city: buyer.city,
        postal: buyer.postal,
        phone: buyer.phone,
        company: buyer.company,
      },
      delivery: {
        name: `${delivery.firstName} ${delivery.lastName}`,
        mail: delivery.email,
        address: delivery.address,
        city: delivery.city,
        postal: delivery.postal,
        phone: delivery.phone,
      },
      totalPrice: generateTotalPrice(),
      cart: updatedCart,
      paymentMethod,
      deliveryCost: generateDelivery(),
      date: new Date().toString(),
      code,
      notes,
    });

    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/nakup-uspesen");
    }
    return error;
  }
}

export async function updateOrderStatus({
  id,
  status,
  paid,
}: {
  id: number;
  status?: string;
  paid?: string;
}) {
  try {
    const { error } = await supabase
      .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
      .update({ status, paid })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin");
  } catch (error) {
    return error;
  }
}

export async function getTopProductsByMonth(date = new Date()) {
  try {
    const { data, error } = await supabase.rpc("get_top_products_by_month", {
      target_month: date,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getTopProductsByLastDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_top_products_last_days", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSalesByDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_daily_sales_last_days", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getOrdersByDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_daily_orders_count", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getAverageByDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc(
      "get_daily_average_order_value",
      {
        start_date: start_date.toISOString().split("T")[0],
        end_date: end_date.toISOString().split("T")[0],
      },
    );

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getTotalOrdersByMonth(date = new Date()) {
  try {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfNextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1,
    );

    const { data, error } = await supabase
      .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
      .select("*")
      .gte("created_at", startOfMonth.toISOString())
      .lt("created_at", startOfNextMonth.toISOString())
      .neq("status", "Preklicano");

    if (error) {
      throw error;
    }

    return data.length;
  } catch (error) {
    return error;
  }
}

export async function getOrder({
  email,
  id,
  sumup_id,
}: {
  email?: string;
  id?: string;
  sumup_id?: string;
}) {
  try {
    const query = supabase
      .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (email) {
      query.eq("buyer->>email", email);
    }

    if (id) {
      query.eq("id", id);
    }

    if (sumup_id) {
      query.eq("sumup_id", sumup_id);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function updateOrderTrackingNo({
  id,
  tracking_no,
}: {
  id: number;
  tracking_no: string | null;
}) {
  try {
    const { error } = await supabase
      .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
      .update({ tracking_no })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin");
  } catch (error) {
    return error;
  }
}

export async function updateOrderMyNotes({
  id,
  my_notes,
}: {
  id: number;
  my_notes: string | null;
}) {
  try {
    const { error } = await supabase
      .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
      .update({ my_notes })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin");
  } catch (error) {
    return error;
  }
}

export async function generateTracking({
  delivery,
  buyer,
  payment_method,
  total_price,
  id,
  parcelType,
}: {
  delivery: {
    firstName: string;
    lastName: string;
    city: string;
    postal: string;
    address: string;
  };
  buyer: { email: string; phone: string; firstName: string };
  payment_method: string;
  total_price: number;
  id: number;
  parcelType: string;
}) {
  try {
    const username = process.env.PS_USER!;
    const password = process.env.PS_PASS!;
    const authHeader =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    const guidRes = await fetch(`${process.env.POSTA_URL}/eOddaja/R_GetGuid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        Authentication: {
          KomitentId: "482164",
          PogodbaId: "159289",
          PodruznicaId: "0",
          PostaID: "7773",
        },
      }),
    });

    const guidData = await guidRes.json();

    if (guidRes.status !== 200) {
      console.log(guidRes);
      throw new Error("Nekaj je šlo narobe");
    }

    const { Value } = guidData;

    function generateData() {
      if (payment_method === "povzetje") {
        return [
          {
            parcelType: Number(parcelType),
            parcels: [
              {
                additionalServices: [
                  {
                    code: "ODKBN",
                    amount: total_price,
                  },
                ],
                parcelNumber: "",
              },
            ],
            addressee: {
              addresseeName1: `${delivery.firstName} ${delivery.lastName}`,
              addresseeAddress: delivery.address,
              addresseePostId: delivery.postal,
              addresseePost: delivery.city,
              addresseeCountryId: "705",
              addresseePhone: buyer.phone,
              addresseeEmail: buyer.email,
            },
            recordNumber: 1,
          },
        ];
      } else {
        return [
          {
            parcelType: Number(parcelType),
            parcels: [
              {
                parcelNumber: "",
              },
            ],
            addressee: {
              addresseeName1: `${delivery.firstName} ${delivery.lastName}`,
              addresseeAddress: delivery.address,
              addresseePostId: delivery.postal,
              addresseePost: delivery.city,
              addresseeCountryId: "705",
              addresseePhone: buyer.phone,
              addresseeEmail: buyer.email,
            },
            recordNumber: 1,
          },
        ];
      }
    }

    await fetch(`${process.env.POSTA_URL}/eOddaja/C_PostData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        Authentication: {
          KomitentId: "482164",
          PogodbaId: "159289",
          PodruznicaId: "0",
          PostaID: "7773",
        },
        Guid: Value,
        DataType: 4,
        Data: generateData(),
      }),
    });

    let trackingNo: string;

    const status = await new Promise<{ ResultCode: number }>((resolve) => {
      const intervalId = setInterval(async function () {
        const statusRes = await fetch(
          `${process.env.POSTA_URL}/eOddaja/R_GetStatus`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Encoding": "identity",
              Authorization: authHeader,
            },
            body: JSON.stringify({
              Authentication: {
                KomitentId: "482164",
                PogodbaId: "159289",
                PodruznicaId: "0",
                PostaID: "7773",
              },
              Guid: Value,
            }),
          },
        );

        const statusData = await statusRes.json();

        if (statusData.Value.ResultCode === 4) {
          clearInterval(intervalId);
          console.log(statusData.Value.Errors);
          throw new Error("Napaka");
        }

        if (statusData.Value.ResultCode !== 1) {
          clearInterval(intervalId);
          trackingNo = statusData.Value.ParcelsNumbers[0].ParcelNumber;
          await supabase
            .from(
              process.env.NODE_ENV === "development" ? "test_orders" : "orders",
            )
            .update({
              tracking_no: statusData.Value.ParcelsNumbers[0].ParcelNumber,
              posta_guid: Value,
            })
            .eq("id", id);
          resolve(statusData.Value);
        }
      }, 3000);
    });

    if (status.ResultCode !== 3) {
      throw new Error("Nekaj je šlo narobe");
    }

    const docBase64 = await new Promise<string>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const docRes = await fetch(
            `${process.env.POSTA_URL}/eOddaja/R_GetDocument`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "identity",
                Authorization: authHeader,
              },
              body: JSON.stringify({
                Authentication: {
                  KomitentId: 482164,
                  PogodbaId: 159289,
                  PodruznicaId: 0,
                  PostaId: "7773",
                },
                Guid: Value,
                Data: trackingNo,
              }),
            },
          );

          const docData = await docRes.json();

          if (docData.Code === 200) {
            clearInterval(intervalId);
            // await sendTrackingNumber({ buyer, trackingNo });
            resolve(docData.Value);
          }
        } catch (err) {
          clearInterval(intervalId);
          reject(err);
        }
      }, 3000);
    });

    revalidatePath("/admin/narocila");

    return docBase64;
  } catch (error) {
    console.log(error);
  }
}

export async function downloadList(Guid: string) {
  try {
    const username = process.env.PS_USER!;
    const password = process.env.PS_PASS!;
    const authHeader =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    const docBase64 = await new Promise<string>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const docRes = await fetch(
            `${process.env.POSTA_URL}/eOddaja/R_GetDocument`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "identity",
                Authorization: authHeader,
              },
              body: JSON.stringify({
                Authentication: {
                  KomitentId: 482164,
                  PogodbaId: 159289,
                  PodruznicaId: 0,
                  PostaId: "7773",
                },
                Guid,
              }),
            },
          );

          const docData = await docRes.json();

          if (docData.Code === 200) {
            clearInterval(intervalId);
            // await sendTrackingNumber({ buyer, trackingNo });
            resolve(docData.Value);
          }
        } catch (err) {
          clearInterval(intervalId);
          reject(err);
        }
      }, 3000);
    });

    revalidatePath("/admin/narocila");

    return docBase64;
  } catch (error) {
    console.log(error);
  }
}

export async function downloadStamp({
  Guid,
  Data,
}: {
  Guid: string;
  Data: string;
}) {
  try {
    const username = process.env.PS_USER!;
    const password = process.env.PS_PASS!;
    const authHeader =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    const docBase64 = await new Promise<string>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const docRes = await fetch(
            `${process.env.POSTA_URL}/eOddaja/R_GetDocument`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "identity",
                Authorization: authHeader,
              },
              body: JSON.stringify({
                Authentication: {
                  KomitentId: 482164,
                  PogodbaId: 159289,
                  PodruznicaId: 0,
                  PostaId: "7773",
                },
                Guid,
                Data,
              }),
            },
          );

          const docData = await docRes.json();

          if (docData.Code === 200) {
            clearInterval(intervalId);
            // await sendTrackingNumber({ buyer, trackingNo });
            resolve(docData.Value);
          }
        } catch (err) {
          clearInterval(intervalId);
          reject(err);
        }
      }, 3000);
    });

    revalidatePath("/admin/narocila");

    return docBase64;
  } catch (error) {
    console.log(error);
  }
}
