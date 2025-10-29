import ReportPage from "@/pages/Private/report/Report.page";
import { Route, Routes } from "react-router-dom";

const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ReportPage />} />
    </Routes>
  );
};

export default ReportRoutes;
