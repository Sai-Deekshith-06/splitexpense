import React, { useState, useEffect } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { Spline } from 'lucide-react'
import SplitExpense from './SplitExpense'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { apiFetch } from '../../services/api'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import { Skeleton } from 'boneyard-js/react'

function Dashboard() {
    const [splitPanelActive, setSplitPanelActive] = useState(false);
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get("gc");
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState(null);
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const response = await apiFetch(`/group/${groupId}`, "GET", null, true);
                if (response.status) {
                    const grp = response.group;
                    console.log(grp);
                    setGroupData(grp);
                    const found = grp?.members?.find(member => member.upi === user?.upi) || null;
                    setUserData(found);
                    const mems = grp?.members?.map(m => ({ upi: m.upi, name: m.name })) || [];
                    setMembers(mems);
                    console.log(mems);
                } else {
                    toast.error(response.message);
                    navigate("/me");
                }
            } catch (error) {
                console.error("Error fetching group data:", error);
                toast.error("Error fetching group data");
                navigate("/me");
            } finally {
                setLoading(false);
            }
        };

        if (groupId?.length === 6) {
            fetchGroupData();
        } else {
            toast.error("Invalid group code");
            navigate("/me");
        }
    }, [groupId, user, navigate]);
    const updateSplitPanelActive = (status) => {
        setSplitPanelActive(status);
        if (status) {
            setTimeout(() => {
                const element = document.getElementById("add-expense");
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100);
        }
    };
    return (
        <div className="flex flex-col gap-2 xl:flex-row xl:items-stretch xl:min-h-screen">
            <div className='hidden xl:block'>
                <LeftPanel
                    setSplitPanelActive={(status) => {
                        setSplitPanelActive(status);
                        if (status)
                            setTimeout(() => {
                                const totalAmountEl = document.getElementById("totalAmount");
                                if (totalAmountEl) {
                                    totalAmountEl.focus();
                                }
                            }, 100);
                    }}
                    grpname={groupData?.name}
                    grpcode={groupData?.code}
                    members={groupData?.members?.length || 1}
                    loading={loading}
                />
            </div>
            <div className='xl:hidden'>
                <LeftPanel
                    setSplitPanelActive={(status) => {
                        updateSplitPanelActive(status);
                        if (status)
                            setTimeout(() => {
                                const totalAmountEl = document.getElementById("totalAmount");
                                if (totalAmountEl) {
                                    totalAmountEl.focus();
                                }
                            }, 100);
                    }}
                    grpname={groupData?.name}
                    grpcode={groupData?.code}
                    members={groupData?.members?.length || 1}
                    loading={loading}
                />
            </div>
            {!splitPanelActive && <RightPanel
                grpname={groupData?.name}
                userData={userData}
                loading={loading}
            />}
            {splitPanelActive && <SplitExpense
                setSplitPanelActive={updateSplitPanelActive}
                membersData={members}
                grpcode={groupData?.code}
                loading={loading}
            />}
        </div>
    )
}

export default Dashboard