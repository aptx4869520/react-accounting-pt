"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import AccountingForm from "./components/AccountingForm";
import AccountingList from "./components/AccountingList";

import type { Record } from "./types";

export default function AccountingPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const recordsRef = collection(
      db,
      "users",
      user.uid,
      "records"
    );

    const unsubscribe = onSnapshot(recordsRef, (snapshot) => {
      const recordsData = snapshot.docs.map((doc) => ({
        firestoreId: doc.id, ...doc.data(),
      })) as Record[];

      setRecords(recordsData);
    },
    (error) => {
    console.error("Firestore 讀取失敗：", error);
    }
  );

    return () => unsubscribe();
  }, [user]);

  async function handleAddRecord(record: Record) {
    if (!user) return;

    try {
      await addDoc(
        collection(db, "users", user.uid, "records"),
        {
          ...record,
          createdAt: serverTimestamp(),
        }
      );
    } catch (error) {
      console.error("新增記帳失敗：", error);
    }
  }

  async function handleDeleteRecord(id: string) {
    if (!user) return;

    try {
      await deleteDoc(
        doc(
          db,
          "users",
          user.uid,
          "records",
          id
        )
      );
    } catch (error) {
      console.error("刪除記帳失敗：", error);
    }
  }

  if (loading) {
    return (
      <main className="accounting-page">
        <p>載入中...</p>
      </main>
    );
  }

  return (
    <main className="accounting-page">
      <p className="accounting-user">
        您已經使用 <strong>{user?.email}</strong> 登入
      </p>

      <AccountingForm onAddRecord={handleAddRecord} />

      <AccountingList records={records} onDeleteRecord={handleDeleteRecord} />

      <Link href="/" className="back-link">
        返回首頁
      </Link>
    </main>
  );
}
