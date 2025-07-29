import DashboardChart from "./components/dashboard-chart";
import DashboardHeader from "./components/dashboard-header";
import DashboardTable from "./components/dashboard-table";

import AuthLayout from "@/components/layouts/AuthLayout";

const ANUAL_SALES = [
  { mes: "Enero", ventas: 2899 },
  { mes: "Febrero", ventas: 3638 },
  { mes: "Marzo", ventas: 4797 },
  { mes: "Abril", ventas: 5507 },
  { mes: "Mayo", ventas: 5448 },
  { mes: "Junio", ventas: 6389 },
  { mes: "Julio", ventas: 8615 },
];

const chartDataPorHora = [
  { mes: "07", ventas: 36 },
  { mes: "08", ventas: 66 },
  { mes: "09", ventas: 75 },
  { mes: "10", ventas: 78 },
  { mes: "11", ventas: 78 },
  { mes: "12", ventas: 74 },
  { mes: "13", ventas: 78 },
  { mes: "14", ventas: 78 },
  { mes: "15", ventas: 75 },
  { mes: "16", ventas: 67 },
  { mes: "17", ventas: 80 },
  { mes: "18", ventas: 5 },
];

const chartDataPorSemana = [
  { mes: "Lunes", ventas: 454 },
  { mes: "Martes", ventas: 467 },
  { mes: "Miércoles", ventas: 463 },
  { mes: "Jueves", ventas: 456 },
  { mes: "Viernes", ventas: 465 },
  { mes: "Sábado", ventas: 463 },
  { mes: "Domingo", ventas: 482 },
];
const chartDataPorMes = [
  { mes: "Semana 1", ventas: 2450 },
  { mes: "Semana 2", ventas: 2483 },
  { mes: "Semana 3", ventas: 2435 },
  { mes: "Semana 4", ventas: 2518 },
];
export function Dashboard() {
  return (
    //Move layout to higher level if needed
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full items-center">
        <DashboardHeader />
        <div className="flex flex-col w-full items-start p-5 gap-10 h-[100vh-100px] overflow-y-auto">
          <div className="flex gap-3 w-full">
            <div className="grid grid-cols-2 gap-3 min-w-fit w-full">
              <DashboardChart
                data={chartDataPorHora}
                integer="870"
                decimal="00"
                text="Ventas por día"
              />
              <DashboardChart
                data={chartDataPorSemana}
                integer="3.250"
                decimal="00"
                text="Ventas de la semana"
              />
              <DashboardChart
                data={chartDataPorMes}
                integer="9.886"
                decimal="00"
                text="Ventas del mes"
              />
              <DashboardChart
                data={ANUAL_SALES}
                integer="20.293"
                decimal="00"
                text="Ventas anuales"
              />
            </div>
          </div>

          <DashboardTable />
        </div>
      </div>
    </AuthLayout>
  );
}
