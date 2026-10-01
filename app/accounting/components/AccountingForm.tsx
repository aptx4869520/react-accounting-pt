"use client";

import { useState } from "react";
import type { Record } from "../types";

type AccountingFormProps = {
  onAddRecord: (record: Record) => void;
};

export default function AccountingForm({onAddRecord}: AccountingFormProps) {
  const [type, setType] = useState("income");  
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  function handleAddRecord() {
    if (amount === "" || description.trim() === "") {
        return;
    }

    const newRecord: Record = {
        id: Date.now(),
        type: type,
        amount: Number(amount),
        description: description,
    };

    onAddRecord(newRecord);

    setAmount("");
    setDescription("")
  }
    
  return (
    <div className="accounting-form">
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>

      <input type="number" placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <input type="text" placeholder="說明" value={description} onChange={(e) => setDescription(e.target.value)}/>
      
      <button onClick={handleAddRecord}>
        新增紀錄
      </button>
    </div>
  );
}