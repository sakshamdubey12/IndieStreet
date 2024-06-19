import React from "react";
import PageTitle from "@/components/common/PageTitle";
import Vendor from "@/components/admin/VendorDetails";

const page = (props) => {
  return (
    <section className="flex flex-col gap-5 w-full px-10 py-3">
      <PageTitle title="Vendor" />
      <div>
        <Vendor />
      </div>
    </section>
  );
};

export default page;
