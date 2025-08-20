import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.tajaclean.si",
      lastModified: new Date(),
    },
    {
      url: "https://www.tajaclean.si/spletna-trgovina",
      lastModified: new Date(),
    },
    {
      url: "https://www.tajaclean.si/o-nas",
      lastModified: new Date(),
    },
    {
      url: "https://www.tajaclean.si/blog",
      lastModified: new Date(),
    },
  ];
}
