export interface Territory {
  id: string;
  country: "USA" | "CA" | "UK";
  franchise: string;
  owner: string;
  territory: string;
}

const territory = (
  country: Territory["country"],
  franchise: string,
  territoryName: string
): Territory => ({
  id: `${country}-${franchise}-${territoryName}`,
  country,
  franchise,
  owner: "Name Lastname",
  territory: territoryName
});

const countryOrder: Territory["country"][] = ["USA", "CA", "UK"];

/* Dev notes from Figma: order by franchise A-Z, then territory A-Z; USA first, then CA, then UK. */
export const territories: Territory[] = [
  territory("USA", "CRDN Emerald Coast", "West Florida and South Alabama"),
  territory("USA", "CRDN Greater Bay Area", "San Jose"),
  territory("USA", "CRDN Greater Bay Area", "Walnut Creek"),
  territory(
    "USA",
    "CRDN Greater Houston South & Surrounding Counties",
    "Houston"
  ),
  territory("USA", "CRDN of Chicago", "North Chicago"),
  territory("USA", "CRDN of Denver", "North Denver"),
  territory("USA", "CRDN of DFW", "Collin"),
  territory("USA", "CRDN of DFW", "Dallas"),
  territory("USA", "CRDN of DFW", "Denton"),
  territory("USA", "CRDN of New Jersey", "Southern New Jersey"),
  territory("USA", "CRDN of Phoenix", "Maricopa"),
  territory("USA", "CRDN of Seattle", "King County"),
  territory("USA", "CRDN of Tampa Bay", "Hillsborough"),
  territory("USA", "CRDN of Tampa Bay", "Pinellas"),
  territory("CA", "CRDN of Calgary", "Calgary"),
  territory("CA", "CRDN of Toronto", "Toronto North"),
  territory("CA", "CRDN of Toronto", "Toronto West"),
  territory("CA", "CRDN of Vancouver", "Lower Mainland"),
  territory("UK", "CRDN of London", "Greater London"),
  territory("UK", "CRDN of Manchester", "Greater Manchester")
].sort(
  (a, b) =>
    countryOrder.indexOf(a.country) - countryOrder.indexOf(b.country) ||
    a.franchise.localeCompare(b.franchise) ||
    a.territory.localeCompare(b.territory)
);
