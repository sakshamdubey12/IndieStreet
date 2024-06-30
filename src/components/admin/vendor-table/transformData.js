// src/components/vendor-table/transformData.ts

export const transformData = (data) => {
  return data.map((item) => {
    const accountProof = item.files[0];
    const addressProof = item.files[1];
    const gstProof = item.files[2];

    return {
      fullname: item.fullname,
      email: item.email,
      phoneNumber: item.phoneNumber,
      businessName: item.businessName,
      businessCategory: item.businessCategory,
      pan: item.pan,
      gst: item.gst,
      accountProof,
      addressProof,
      gstProof,
    };
  });
};
