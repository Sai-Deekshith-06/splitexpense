import React, { useState, useEffect } from 'react'
import LeftPanel from '../pages/group/LeftPanel'
import RightPanel from '../pages/group/RightPanel'
import { Spline } from 'lucide-react'
import SplitExpense from '../pages/group/SplitExpense'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function _Dashboard() {
    const [splitPanelActive, setSplitPanelActive] = useState(false);
    const { user } = {
        "phone": "1234567890",
        "upi": "1234567890@upi",
        "name": "sai"
    };
    const groupId = 180951;
    const [groupData, setGroupData] = useState({
        "_id": "6a22940f2ab611008a474be6",
        "code": "180951",
        "name": "Friends Group",
        "members": [
            {
                "upi": "1234567891@upi",
                "name": "user1",
                "balances": [
                    {
                        "upi": "1234567890@upi",
                        "name": "sai",
                        "amount": 0,
                        "_id": "6a22940f2ab611008a474be8"
                    }
                ],
                "total": 0,
                "_id": "6a22940f2ab611008a474be7"
            },
            {
                "upi": "1234567890@upi",
                "name": "sai",
                "balances": [
                    {
                        "upi": "1234567891@upi",
                        "name": "user1",
                        "amount": 0,
                        "_id": "6a22940f2ab611008a474bea"
                    }
                ],
                "total": 0,
                "_id": "6a22940f2ab611008a474be9"
            }
        ],
        "createdBy": "sai",
        "createdAt": "2026-06-05T09:17:03.720Z",
        "__v": 0
    });
    const [userData, setUserData] = useState({
        "upi": "1234567890@upi",
        "name": "sai",
        "balances": [
            {
                "upi": "1234567891@upi",
                "name": "user1",
                "amount": 1000,
            },
            {
                "upi": "1234567892@upi",
                "name": "user2",
                "amount": 1000,
            },
            {
                "upi": "1234567893@upi",
                "name": "user3",
                "amount": 1100,
            },
        ],
        "total": 2000,
        "_id": "6a22940f2ab611008a474be9"
    });
    const [members, setMembers] = useState([
        {
            "upi": "1234567891@upi",
            "name": "user1"
        },
        {
            "upi": "1234567890@upi",
            "name": "sai"
        }
    ]);
    const [loading, setLoading] = useState(true);
    return (
        <div className="flex flex-col gap-2 xl:flex-row xl:items-stretch xl:min-h-screen">
            <LeftPanel
                setSplitPanelActive={setSplitPanelActive}
                grpname={groupData?.name}
                grpcode={groupData?.code}
                members={groupData?.members?.length || 1}
                loading={true}
            />
            {!splitPanelActive && <RightPanel
                grpname={groupData?.name}
                userData={userData}
                loading={true}
            />}
            {splitPanelActive && <SplitExpense
                setSplitPanelActive={setSplitPanelActive}
                membersData={members}
                grpcode={groupData?.code}
                loading={true}
            />}
        </div>
    )
}

export default _Dashboard