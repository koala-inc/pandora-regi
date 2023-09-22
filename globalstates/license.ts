import useGlobal from "./useGlobal";

export default function useLicenseGlobal() {
  return useGlobal({
    key: "license",
    initialState: process.env.NEXT_PUBLIC_LICENSE_KEY || "",
  });
}
