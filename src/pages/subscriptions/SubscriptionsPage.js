import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/cards/StatCard";
import { Box } from "@mui/material";
import SearchInput from "../../components/common/SearchInput";
import FilterSelect from "../../components/common/FilterSelect";
import CustomTable from "../../components/tables/CustomTable"
import RejectDialog from "./RejectDialog";
import PendingIcon from '@mui/icons-material/Pending';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {IconButton,Tooltip} from "@mui/material";
import {Dialog,DialogTitle,DialogContent} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from "@mui/icons-material/Image";
import KeyIcon from "@mui/icons-material/Key";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect } from "react";
import {
    subscriptionPaymentRequestsReject,
    subscriptionPaymentRequestsApprove,
    subscriptionPaymentRequestsPending,
    subscriptionPaymentRequests
} from "../../services/subscriptionService";
import {getSubscriptionPlans} from "../../services/subscriptionPlanService";
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";

export default function SubscriptionPage() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
    const [openReasonDialog, setOpenReasonDialog] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [adminNote, setAdminNote] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [planFilter, setPlanFilter] = useState("all");

    const totalRequests = requests.length;
    const pendingRequests = requests.filter(
        x => x.status === 0
    ).length;
    const approvedRequests = requests.filter(
        x => x.status === 1
    ).length;
    const rejectedRequests = requests.filter(
        x => x.status === 2
    ).length;
    const [plans, setPlans] = useState([]);
    const { t } = useTranslation();

    const columns = [
        {
            field: "providerName",
            header: t("providers"),
        },
        {
            field: "reviewedByAdminName",
            header: t("reviewed by admin"),
        },
        {
            field: "planName",
            header: t("plans"),
        },
        {
            field: "amount",
            header: t("amount"),
        },
        {
            field: "paymentMethod",
            header: t("payment method"),
        },
        {
            field: "status",
            header: t("status"),
        },
        {
            field: "createdAt",
            header: t("created at"),
        },
    ];
    useEffect(() => {
        let data = [...requests];
        if (search) {
            data = data.filter((item) =>
                item.providerName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            data = data.filter(
                (item) =>
                    item.status === Number(statusFilter)
            );
        }

        if (planFilter !== "all") {
            data = data.filter(
                (item) =>
                    item.subscriptionPlanId ===
                    Number(planFilter)
            );
        }

        setFilteredRequests(data);
    }, [search, statusFilter, planFilter, requests]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const requestsData =
                await subscriptionPaymentRequests();

            const plansData =
                await getSubscriptionPlans();

            setRequests(requestsData);
            setFilteredRequests(requestsData);
            setPlans(plansData);
        } catch (error) {
            console.log(error);
        }
    };
    const handleApprove = async (id) => {
        try {
            await subscriptionPaymentRequestsApprove(id);

            loadData();
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleOpenReject = (row) => {
        setSelectedRequest(row);
        setAdminNote("");
        setOpenRejectDialog(true);
    };
    const handleReject = async () => {
        try {

            await subscriptionPaymentRequestsReject(
                selectedRequest.id,
                adminNote
            );

            setOpenRejectDialog(false);

            loadData();

        } catch (error) {

            console.log(error);

        }
    };
    const handleShowTransaction = (row) => {

        setSelectedRequest(row);

        setOpenTransactionDialog(true);

    };
    const handleShowReason = (row) => {

        setSelectedRequest(row);

        setOpenReasonDialog(true);

    };
    const handleShowImage = (row) => {

        setSelectedRequest(row);

        setOpenImageDialog(true);

    };
    const tableActions = (row) => (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1
            }}
        >

            {
                row.status === 0 && (

                    <>
                        <Tooltip title="قبول الطلب">

                            <IconButton
                                color="success"
                                onClick={() =>
                                    handleApprove(row.id)
                                }
                            >
                                <CheckCircleIcon />
                            </IconButton>

                        </Tooltip>


                        <Tooltip title="رفض الطلب">

                            <IconButton
                                color="error"
                                onClick={() =>
                                    handleOpenReject(row)
                                }
                            >
                                <CancelIcon />
                            </IconButton>

                        </Tooltip>
                    </>

                )
            }


            <Tooltip title="رقم العملية">

                <IconButton
                    color="primary"
                    onClick={() =>
                        handleShowTransaction(row)
                    }
                >

                    <KeyIcon />

                </IconButton>

            </Tooltip>


            <Tooltip title="الإيصال">

                <IconButton
                    disabled={!row.proofImageUrl}
                    onClick={() =>
                        handleShowImage(row)
                    }
                >

                    <ImageIcon />

                </IconButton>

            </Tooltip>


            {
                row.status === 2 && (

                    <Tooltip title="سبب الرفض">

                        <IconButton
                            color="warning"
                            onClick={() =>
                                handleShowReason(row)
                            }
                        >

                            <CommentIcon />

                        </IconButton>

                    </Tooltip>

                )
            }

        </Box>

    );

    return (
        <>
            <PageHeader
                title={t("manage subscription requests")}
                subtitle={t("disc-subscription-requests")}
            />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: 3,
                    mb: 4,
                }}
            >
                <StatCard
                    title={t("all orders")}
                    value={totalRequests}
                    icon={<RequestQuoteIcon />}
                />

                <StatCard
                    title={t("orders pending")}
                    value={pendingRequests}
                    icon={<PendingIcon />}
                />

                <StatCard
                    title={t("approved")}
                    value={approvedRequests}
                    icon={<ThumbUpIcon />}
                />
                <StatCard
                    title={t("rejected")}
                    value={rejectedRequests}
                    icon={<ThumbDownIcon />}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    mb: 3,
                }}>
                <SearchInput
                    placeholder="ابحث عن مستخدم..."
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value)
                    }}
                />
                <FilterSelect
                    label="الحالة"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    options={[
                        {
                            value: "all",
                            label: "الكل",
                        },
                        {
                            value: 0,
                            label: "قيد الانتظار",
                        },
                        {
                            value: 1,
                            label: "مقبول",
                        },
                        {
                            value: 2,
                            label: "مرفوض",
                        },
                    ]}
                />
                <FilterSelect
                    label="الخطة"
                    value={planFilter}
                    onChange={(e) =>
                        setPlanFilter(e.target.value)
                    }
                    options={[
                        {
                            value: "all",
                            label: "الكل",
                        },

                        ...plans.map((plan) => ({
                            value: plan.id,
                            label: plan.name,
                        })),
                    ]}
                />
            </Box>

            <CustomTable
                columns={columns}
                rows={filteredRequests}
                actions={tableActions}
            />

            <Dialog
                open={openTransactionDialog}
                onClose={() =>
                    setOpenTransactionDialog(false)
                }
            >

                <DialogTitle>

                    رقم العملية

                </DialogTitle>

                <DialogContent>

                    <Typography>

                        {selectedRequest?.transactionId}

                    </Typography>

                </DialogContent>

            </Dialog>

            <Dialog
                open={openReasonDialog}
                onClose={() =>
                    setOpenReasonDialog(false)
                }
            >

                <DialogTitle>

                    سبب الرفض

                </DialogTitle>

                <DialogContent>

                    <Typography>

                        {
                            selectedRequest?.adminNote ||
                            "لا يوجد سبب"
                        }

                    </Typography>

                </DialogContent>

            </Dialog>

            <Dialog
                open={openImageDialog}
                onClose={() =>
                    setOpenImageDialog(false)
                }
                maxWidth="md"
            >

                <DialogContent>

                    <img
                        src={selectedRequest?.proofImageUrl}
                        style={{
                            width: "100%"
                        }}
                    />

                </DialogContent>

            </Dialog>

            <RejectDialog
                open={openRejectDialog}
                onClose={() => setOpenRejectDialog(false)}
                adminNote={adminNote}
                setAdminNote={setAdminNote}
                onSubmit={handleReject}
            />
        </>
    )
}