import offers from "@/data/offers.json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const simulate = searchParams.get("simulate") ?? "ok";
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const stops = searchParams.get("stops");
  const airlines = searchParams.get("airlines");
  const price = searchParams.get("price");
  const cabin = searchParams.get("cabin");
  const sort = searchParams.get("sort");

  const selectedAirlines = airlines?.split(",").filter(Boolean) ?? [];

  let matchingOffers = offers.filter((offer) => {
    const matchesFrom = !from || offer.origin.code === from;

    const matchesTo = !to || offer.destination.code === to;

    const matchesDate = !date || offer.departureTime.startsWith(date);

    const matchesStops = stops === null || offer.stops === Number(stops);

    const matchesAirline =
      selectedAirlines.length === 0 ||
      selectedAirlines.includes(offer.airline.code);

    const matchesPrice = !price || offer.pricePkr <= Number(price);

    const matchesCabin = !cabin || offer.cabin === cabin;

    return (
      matchesFrom &&
      matchesTo &&
      matchesDate &&
      matchesStops &&
      matchesAirline &&
      matchesPrice &&
      matchesCabin
    );
  });

  if (sort === "price-asc") {
    matchingOffers = [...matchingOffers].sort(
      (a, b) => a.pricePkr - b.pricePkr,
    );
  }

  if (sort === "price-desc") {
    matchingOffers = [...matchingOffers].sort(
      (a, b) => b.pricePkr - a.pricePkr,
    );
  }

  if (sort === "duration") {
    matchingOffers = [...matchingOffers].sort(
      (a, b) => a.durationMinutes - b.durationMinutes,
    );
  }

  const delay =
    simulate === "slow" ? 2500 : Math.floor(Math.random() * 1301) + 1200;

  await sleep(delay);

  if (simulate === "error") {
    return Response.json(
      {
        message: "Flight suppliers are temporarily unavailable.",
      },
      {
        status: 503,
      },
    );
  }

  if (simulate === "empty") {
    return Response.json({
      offers: [],
      failedAirlines: [],
    });
  }

  if (simulate === "partial") {
    return Response.json({
      offers: matchingOffers.slice(0, 2),
      failedAirlines: ["Pakistan International Airlines"],
    });
  }

  return Response.json({
    offers: matchingOffers,
    failedAirlines: [],
  });
}
