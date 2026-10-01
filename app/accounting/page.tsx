"use client";

import { useState } from "react";
import Link from "next/link";


import AccountingForm from "./components/AccountingForm";
import AccountingList from "./components/AccountingList";

import type { Record } from "./types";

export default function AccountingPage() {
  const [records, setRecords] = useState<Record[]>([]);

  function handleAddRecord(record: Record) {
    setRecords(currentRecords => [...currentRecords, record]);
  }

  function handleDeleteRecord(id: number) {
    setRecords(currentRecords => currentRecords.filter((record) => record.id !== id));
  }

  return (
    <main className="accounting-page">
      <h1>Accounting</h1>

      <AccountingForm onAddRecord={handleAddRecord} />

      <AccountingList records={records} onDeleteRecord={handleDeleteRecord} />

      <Link href="/" className="back-link">
        返回首頁
      </Link>
    </main>
  );
}
