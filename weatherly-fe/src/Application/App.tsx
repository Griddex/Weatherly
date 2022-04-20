import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Routes/Layout";
import NotFound from "./Routes/NotFound";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
