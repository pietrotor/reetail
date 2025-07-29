import { ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router";

import Table from "@/components/table";

// Mapeo de estilos para el badge de estado
const statusBadgeVariants = {
  variants: {
    Disponible: {
      className: "bg-[#1BD1331A] text-[#1BD133]",
      text: "Disponible",
    },
    "Sin stock": {
      className: "bg-[#DD214F26] text-[#DD214F]",
      text: "Sin stock",
    },
  },
  size: {
    sm: { className: "text-[10px]", iconSize: 12 },
    md: { className: "text-sm", iconSize: 14 },
    lg: { className: "text-lg", iconSize: 16 },
  },
};

type BadgeStatus = keyof typeof statusBadgeVariants.variants;

function LocalStatusBadge({
  status,
  size = "sm",
}: {
  status: BadgeStatus;
  size?: keyof typeof statusBadgeVariants.size;
}) {
  const variant = statusBadgeVariants.variants[status];
  const sz = statusBadgeVariants.size[size];
  return (
    <div
      className={`flex gap-1 py-[3px] px-[7px] rounded-full items-center justify-center w-fit ${variant.className} ${sz.className}`}
    >
      <Clock size={sz.iconSize} />
      {variant.text}
    </div>
  );
}

// Mock data
type OrderRow = {
  orderCode: string;
  products: { name: string; quantity: number; image: string }[];
  retailer: { name: string; logo: string };
  status: BadgeStatus;
  id: string;
};

const mockData: OrderRow[] = [
  {
    orderCode: "PED-010001",
    products: [
      {
        name: "Pan integral",
        quantity: 2,
        image:
          "https://blog.elamasadero.com/wp-content/uploads/pan_integral_espelta_700.jpg",
      },
      {
        name: "Leche entera 1L",
        quantity: 1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcimTHEZ8alehk3EMahrFX97YtQ-LopDnOA&s",
      },
    ],
    retailer: {
      name: "Supermercado Viva",
      logo: "https://img.freepik.com/vector-premium/logotipo-supermercado_23-2148459011.jpg",
    },
    status: "Disponible",
    id: "1",
  },
  {
    orderCode: "PED-010002",
    products: [
      {
        name: "Huevos (12 un.)",
        quantity: 1,
        image:
          "https://static01.nyt.com/images/2024/05/29/dining/20EGGS1-esp/20EGGS1-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      },
      {
        name: "Aceite de oliva 500ml",
        quantity: 1,
        image:
          "https://icnorteb2c.vteximg.com.br/arquivos/ids/156877-600-600/Aceite-de-Oliva-Virgen-Extra-Carbonell-500-Ml-1-662.jpg?v=637369073915500000",
      },
    ],
    retailer: {
      name: "Mercado Central",
      logo: "https://i.pinimg.com/736x/d6/6d/38/d66d38c2c59118fa58055ff0436c9fc2.jpg",
    },
    status: "Sin stock",
    id: "2",
  },
  {
    orderCode: "PED-010003",
    products: [
      {
        name: "Arroz blanco 1kg",
        quantity: 1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oTfVlS2C-H5O9L263ige9m3_xlpHXk8tLg&s",
      },
      {
        name: "Frijoles negros 500g",
        quantity: 2,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbjFvyy_u1eGlOxn8U8Tqhisye0LgZnJi5Zw&s",
      },
    ],
    retailer: {
      name: "Abarrotes Morales",
      logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/supermarket-grocery-logo-design-template-e43b99901aa11fad8aa024c3a84b0d2f_screen.jpg?ts=1734421227",
    },
    status: "Disponible",
    id: "3",
  },
  {
    orderCode: "PED-010004",
    products: [
      {
        name: "Cereal integral",
        quantity: 1,
        image:
          "https://www.nestle-cereals.com/do/sites/g/files/qirczx976/files/styles/1_1_768px_width/public/2023-02/2.png.webp?itok=DkR9K-Mj",
      },
    ],
    retailer: {
      name: "Tienda Saludable",
      logo: "https://www.shutterstock.com/image-vector/supermarket-logo-fruit-inside-shopping-260nw-2446378847.jpg",
    },
    status: "Disponible",
    id: "4",
  },
  {
    orderCode: "PED-010005",
    products: [
      {
        name: "Azúcar refinada 1kg",
        quantity: 1,
        image:
          "https://farmacorp.com/cdn/shop/files/7770108600077.jpg?v=1714440625",
      },
      {
        name: "Café molido 250g",
        quantity: 1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA2GPo90TnxNzQ299tnRMY7htcDhlS3Gjh8Q&s",
      },
    ],
    retailer: {
      name: "Café&Co",
      logo: "https://marketplace.canva.com/EAF5V9i5G5g/1/0/1600w/canva-logotipo-cafeter%C3%ADa-figurativo-caf%C3%A9-y-beige-rxcvtLtKSx8.jpg",
    },
    status: "Sin stock",
    id: "5",
  },
];

export default function DashboardTable() {
  const columns = [
    { value: "Código Pedido" },
    { value: "Productos" },
    { value: "Minorista" },
    { value: "Estado" },
    { value: "" },
  ];

  const rows = mockData.map((item) => [
    { value: item.orderCode },
    {
      value: (
        <div className="flex items-center space-x-2">
          {item.products.map((prod, idx) => (
            <div key={idx} className="flex items-center">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-8 h-8 rounded mr-1"
              />
              <span className="text-sm">
                {prod.name} ({prod.quantity})
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      value: (
        <div className="flex items-center space-x-2">
          <img
            src={item.retailer.logo}
            alt={item.retailer.name}
            className="w-6 h-6 rounded"
          />
          <span>{item.retailer.name}</span>
        </div>
      ),
    },
    {
      value: <LocalStatusBadge status={item.status} size="md" />,
    },
    {
      value: (
        <Link to={`/payment/${item.id}`}>
          <ChevronRight className="text-[#5D6C87] cursor-pointer" />
        </Link>
      ),
    },
  ]);

  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="text-[21px]">Pedidos</h1>
      <Table
        columns={columns}
        rows={rows}
        className="text-sm w-full"
        columnClassName="text-left text-[#5D6C87] font-normal py-5"
        rowClassName="border-t pt-4 pb-4"
      />
    </div>
  );
}
