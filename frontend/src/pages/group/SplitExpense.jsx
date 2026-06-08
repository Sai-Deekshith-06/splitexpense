import React, { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    X,
    IndianRupee,
    PieChart,
    Percent,
    RefreshCcw,
    Plus,
    Wallet,
    Clock3,
    ShieldCheck,
    Users,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from '../../services/api'
import { Skeleton } from 'boneyard-js/react'

import MemberRow from "./components/MemberRow";
import SplitTabs from "./components/SplitTabs";
import TotalsFooter from "./components/TotalsFooter";
import SearchableSelect from "./components/SearchableSelect";

const SplitExpense = ({ setSplitPanelActive, membersData, grpcode, loading }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [paidBy, setPaidBy] = useState({ name: "", upi: "" });
    const [splitType, setSplitType] = useState("amount");

    const [members, setMembers] = useState(
        membersData.map((member) => ({ ...member, value: 0, checked: true, calculatedAmount: 0 }))
    );

    const assignedAmount = useMemo(() => {
        if (splitType === "amount") {
            return members.reduce((sum, member) => sum + (member.checked ? Number(member.value || 0) : 0), 0);
        }

        if (splitType === "share") {
            const totalShares = members.reduce((sum, member) => sum + (member.checked ? Number(member.value || 0) : 0), 0);
            if (totalShares === 0) return 0;
            return totalAmount;
        }

        if (splitType === "percent") {
            const totalPercent = members.reduce((sum, member) => sum + (member.checked ? Number(member.value || 0) : 0), 0);
            return (totalAmount * totalPercent) / 100;
        }

        return 0;
    }, [members, splitType, totalAmount]);

    const remainingAmount = Number(totalAmount) - Number(assignedAmount);

    const updateMemberValue = (upi, value) => {
        const numericValue = value === "" ? 0 : Number(value);

        setMembers((prev) => {
            const updatedMembers = prev.map((member) =>
                member.upi === upi
                    ? {
                        ...member,
                        value: numericValue,
                    }
                    : member
            );

            // SHARE MODE
            if (splitType === "share") {
                const totalShares = updatedMembers.reduce(
                    (sum, member) => sum + Number(member.value || 0),
                    0
                );

                return updatedMembers.map((member) => ({
                    ...member,
                    calculatedAmount:
                        totalShares > 0
                            ? (
                                (totalAmount * member.value) /
                                totalShares
                            ).toFixed(2)
                            : 0,
                }));
            }

            // PERCENT MODE
            if (splitType === "percent") {
                return updatedMembers.map((member) => ({
                    ...member,
                    calculatedAmount: (
                        (totalAmount * member.value) /
                        100
                    ).toFixed(2),
                }));
            }

            // AMOUNT MODE
            return updatedMembers.map((member) => ({
                ...member,
                calculatedAmount: member.value,
            }));
        });
    };

    useEffect(() => {
        setMembers((prev) => {
            const activeMembers = prev.filter(
                (member) => member.checked
            );

            if (!activeMembers.length) return prev;
            const equalAmount =
                totalAmount / activeMembers.length;

            // AMOUNT
            if (splitType === "amount") {
                return prev.map((member) => ({
                    ...member,
                    value: member.checked
                        ? Number(equalAmount.toFixed(0))
                        : 0,
                    calculatedAmount: member.checked
                        ? Number(equalAmount.toFixed(0))
                        : 0,
                }));
            }

            // SHARE
            if (splitType === "share") {
                return prev.map((member) => ({
                    ...member,
                    value: member.checked ? 1 : 0,
                    calculatedAmount: member.checked
                        ? Number(equalAmount.toFixed(0))
                        : 0,
                }));
            }

            // PERCENT
            if (splitType === "percent") {
                const equalPercent =
                    100 / activeMembers.length;

                return prev.map((member) => ({
                    ...member,
                    value: member.checked
                        ? Number(equalPercent.toFixed(0))
                        : 0,
                    calculatedAmount: member.checked
                        ? Number(equalAmount.toFixed(0))
                        : 0,
                }));
            }

            return prev;
        });
    }, [splitType, totalAmount]);

    const splitEqually = () => {
        const activeMembers = members.filter((member) => member.checked);
        if (!activeMembers.length) return;

        if (splitType === "amount") {
            const equalAmount = totalAmount / activeMembers.length;
            setMembers((prev) => prev.map((member) => ({ ...member, value: member.checked ? equalAmount.toFixed(0) : 0 })));
        }

        if (splitType === "share") {
            setMembers((prev) => prev.map((member) => ({ ...member, value: member.checked ? 1 : 0 })));
        }

        if (splitType === "percent") {
            const equalPercent = 100 / activeMembers.length;
            setMembers((prev) => prev.map((member) => ({ ...member, value: member.checked ? equalPercent.toFixed(0) : 0 })));
        }
    };

    const toggleMemberChecked = (upi) => {
        setMembers((prev) => prev.map((m) => (m.upi === upi ? { ...m, checked: !m.checked } : m)));
    };

    const handleOnDone = async () => {
        if (remainingAmount !== 0 || assignedAmount !== totalAmount) {
            toast.error("Invalid split amounts");
        }
        const expenseData = {
            "groupId": grpcode,
            "amount": totalAmount,
            "desc": description,
            "paidBy": paidBy.upi,
            "splits": members.filter(m => m.checked).map(m => ({
                upi: m.upi,
                value: m.calculatedAmount
            }))
        };
        // console.log(expenseData);
        // console.log(members);
        try {
            const response = await apiFetch("/group/txn/add", "POST", expenseData, true);
            if (!response.status) {
                toast.error(response.message || "Error adding expense");
                return;
            }
            toast.success("Expense added successfully");
            setSplitPanelActive(false);
        } catch (error) {
            console.log(error);
            toast.error("Error adding expense");
        }
    };

    return (
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-4 flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSplitPanelActive(false)}
                        className="cursor-pointer p-3 rounded-full hover:bg-amber-50 active:scale-95 active:bg-amber-100 transition-all duration-150"
                    >
                        <ArrowLeft
                            className="text-gray-700"
                            size={26}
                        />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Add Expense</h1>
                </div>

                <button
                    onClick={() => setSplitPanelActive(false)}
                    className="p-3 rounded-full hover:bg-red-50 active:bg-red-100 active:scale-95 transition-all duration-150"
                >
                    <X
                        size={28}
                        className="text-gray-600 hover:text-black"
                    />
                </button>
            </div>

            {/* MAIN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 flex-1" id="add-expense">
                {/* LEFT SIDE */}
                <div>
                    {/* Total Amount */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Total Amount</label>

                        <div className="mt-3 flex items-center border border-gray-300 rounded-xl overflow-hidden h-10">
                            <div className="w-12 flex items-center justify-center border-r border-gray-300 h-full">
                                <IndianRupee size={16} />
                            </div>

                            <input
                                name="totalAmount"
                                id="totalAmount"
                                type="number" value={totalAmount === 0 ? "" : totalAmount}
                                onChange={(e) => setTotalAmount(Number(e.target.value))}
                                className="flex-1 h-full px-3 outline-none text-sm"
                                min={0}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-8">
                        <label className="text-sm font-medium text-gray-700">Description (Optional)</label>

                        <div className="relative mt-3">
                            <input type="text" value={description} maxLength={100} onChange={(e) => setDescription(e.target.value)} className="w-full h-10 border border-gray-300 rounded-xl px-3 pr-16 text-sm outline-none focus:ring-2 focus:ring-red-100" />

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{description.length}/100</span>
                        </div>
                    </div>

                    {/* Paid By */}
                    <SearchableSelect members={members} paidBy={paidBy} setPaidBy={setPaidBy} loading={loading} />

                    {/* PAID INFO */}
                    {paidBy.name !== "" && paidBy.upi !== "" && totalAmount > 0 && (
                        <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
                            <ShieldCheck className="text-green-600" size={22} />
                            <p className="text-green-800 font-medium text-sm">₹{totalAmount} will be added as paid by {paidBy.name} ({paidBy.upi})</p>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="border-l border-gray-200 pl-8">
                    {paidBy.name !== "" && paidBy.upi !== "" && totalAmount > 0 && (
                        <>
                            <SplitTabs splitType={splitType} setSplitType={setSplitType} />
                            <div>
                                <div
                                    className={`text-sm mt-4 p-3  border border-gray-100 rounded-xl flex items-center justify-between
                                    ${remainingAmount > 0 ? "bg-yellow-50 text-yellow-600" : remainingAmount === 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                                >
                                    <span className="">
                                        Remaining Amount
                                    </span>

                                    <span className="font-semibold">
                                        ₹{remainingAmount}
                                    </span>
                                </div>
                                <div
                                    className={`text-sm mt-1 p-3  border border-gray-100 rounded-xl flex items-center justify-between
                                    bg-gray-550 text-gray-700`}
                                >
                                    <span className="">
                                        Assigned Amount
                                    </span>
                                    <Skeleton name="split-expense-assigned-amount" loading={loading}>
                                        <span className="font-semibold">
                                            ₹{assignedAmount}
                                        </span>
                                    </Skeleton>
                                </div>
                            </div>

                            {/* MEMBERS */}
                            <div className="mt-6 flex flex-col">
                                {members.map((member) => (
                                    <MemberRow key={member.upi} member={member} updateMemberValue={updateMemberValue} toggleChecked={toggleMemberChecked} splitType={splitType} loading={loading} />
                                ))}

                                <button className="mt-4 h-10 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-purple-700 font-semibold text-sm hover:bg-purple-50">
                                    <Plus size={16} />
                                    Add Another Member
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <TotalsFooter
                totalAmount={totalAmount}
                assignedAmount={assignedAmount}
                remainingAmount={remainingAmount}
                onSplitEqually={splitEqually}
                onDone={handleOnDone} />
        </div>
    );
};

export default SplitExpense;
