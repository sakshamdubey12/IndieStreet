'use client'
import PageTitle from "@/components/common/PageTitle";
import {
  DollarSign,
  Users,
  LucideShoppingBag,
  BoxSelect,
} from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/admin/Card";
import BarChart from "@/components/admin/BarChart";
import SalesCard, { SalesProps } from "@/components/admin/SalesCard";

const cardData= [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Users",
    amount: "+25",
    discription: "+20% from last month",
    icon: Users,
  },
  {
    label: "Vendors",
    amount: "+120",
    discription: "+5% from last month",
    icon: LucideShoppingBag,
  },
  {
    label: "Categories",
    amount: "10",
    discription: "1 since last hour",
    icon: BoxSelect,
  },
];

const uesrSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00",
  },
];

function AdminDashboard() {
  return (
    <div className="flex flex-col gap-5 w-full px-10 py-3">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
export default AdminDashboard