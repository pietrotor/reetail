import { ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router";

import Table from "@/components/table";

// Mapeo de estilos para el badge de estado
type BadgeStatus = "Disponible" | "Actualizar stock" | "Sin stock";
const statusBadgeVariants = {
  variants: {
    Disponible: {
      className: "bg-[#1BD1331A] text-[#1BD133]",
      text: "Disponible",
    },
    "Actualizar stock": {
      className: "bg-[#F5A62726] text-[#F5A627]",
      text: "Actualizar stock",
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

// Mock data de productos
type ProductRow = {
  codigo: string;
  producto: { name: string; image: string };
  detalle: string;
  estado: BadgeStatus;
  id: string;
};

const mockProducts: ProductRow[] = [
  {
    codigo: "PRD-0001",
    producto: {
      name: "Pan integral",
      image:
        "https://blog.elamasadero.com/wp-content/uploads/pan_integral_espelta_700.jpg",
    },
    detalle: "20 unidades",
    estado: "Disponible",
    id: "1",
  },
  {
    codigo: "PRD-0002",
    producto: {
      name: "Leche entera 1L",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcimTHEZ8alehk3EMahrFX97YtQ-LopDnOA&s",
    },
    detalle: "7 unidades",
    estado: "Actualizar stock",
    id: "2",
  },
  {
    codigo: "PRD-0003",
    producto: {
      name: "Huevos (12)",
      image:
        "https://static01.nyt.com/images/2024/05/29/dining/20EGGS1-esp/20EGGS1-articleLarge.jpg",
    },
    detalle: "120 unidades",
    estado: "Disponible",
    id: "3",
  },
  {
    codigo: "PRD-0004",
    producto: {
      name: "Aceite de oliva 500ml",
      image:
        "https://icnorteb2c.vteximg.com.br/arquivos/ids/156877-600-600/Aceite-de-Oliva-Virgen-Extra-Carbonell-500-Ml-1-662.jpg",
    },
    detalle: "17 cajas",
    estado: "Disponible",
    id: "4",
  },
  {
    codigo: "PRD-0005",
    producto: {
      name: "Arroz blanco 1kg",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oTfVlS2C-H5O9L263ige9m3_xlpHXk8tLg&s",
    },
    detalle: "10 Paquetes",
    estado: "Actualizar stock",
    id: "5",
  },
  {
    codigo: "PRD-0005",
    producto: {
      name: "Harina",
      image:
        "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202410/28/00118037900018____7__600x600.jpg",
    },
    detalle: "0 paquetes",
    estado: "Sin stock",
    id: "6",
  },
];

export default function ProductsTable() {
  const columns = [
    { value: "Código" },
    { value: "Producto" },
    { value: "Stock" },
    { value: "Estado" },
    { value: "" },
  ];

  const rows = mockProducts.map((item) => [
    { value: item.codigo },
    {
      value: (
        <div className="flex items-center space-x-2">
          <img
            src={item.producto.image}
            alt={item.producto.name}
            className="w-8 h-8 rounded"
          />
          <span>{item.producto.name}</span>
        </div>
      ),
    },
    { value: item.detalle },
    {
      value: <LocalStatusBadge status={item.estado} size="md" />,
    },
    {
      value: (
        <Link to={`/product/${item.id}`}>
          <ChevronRight className="text-[#5D6C87] cursor-pointer" />
        </Link>
      ),
    },
  ]);

  return (
    <div className="flex flex-col w-full gap-6">
      <h1 className="text-[21px]">Productos</h1>
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
