export default async function handler(req, res) {
  const catalogue = [
    { id: "t1", type: "top", name: "Relaxed Cotton Tee", link: "#" },
    { id: "b2", type: "bottom", name: "Baggy Denim", link: "#" },
    { id: "s1", type: "shoes", name: "White Leather Sneakers", link: "#" },
  ];
  res.status(200).json(catalogue);
}
