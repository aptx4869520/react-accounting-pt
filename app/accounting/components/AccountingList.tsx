import type { Record } from "../types";

type AccountingListProps = {
  records: Record[];
  onDeleteRecord: (id: number) => void;
};

export default function AccountingList({
  records,
  onDeleteRecord,
}: AccountingListProps) {
  const total = records.reduce((sum, record) => { 
    if (record.type === "expense") {
      return sum - record.amount;
    }
    return sum + record.amount;
  }, 0); 

  return (
    <div className="accounting-list">
      {records.map((record) => (
        <div key={record.id} className="accounting-item">
          <span className="record-amount">
            {record.type === "expense"
              ? -record.amount
              : record.amount}
          </span>

          <span className="record-description">{record.description}</span>

          <button className="delete-button" onClick={() => onDeleteRecord(record.id)}>
            刪除
          </button>
        </div>
      ))}

      <p className="accounting-total">小計: {total}</p>
    </div>
  );
}