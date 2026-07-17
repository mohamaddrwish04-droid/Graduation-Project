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
import { IconButton, Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from "@mui/icons-material/Image";
import KeyIcon from "@mui/icons-material/Key";
import CommentIcon from "@mui/icons-material/Comment";
import Typography from '@mui/material/Typography';
import { useSubscriptionPage } from "./useSubscriptionPage";
import { useTranslation } from "react-i18next";
import { buildImageUrl } from "../../utils/buildImageUrl"
import {TablePagination} from "@mui/material";
export default function SubscriptionPage() {
    const {
        handleApprove, handleReject, handleShowImage,
        handleShowTransaction, handleShowReason, handleOpenReject,
        approvedRequests, rejectedRequests, pendingRequests,
        totalRequests, filteredRequests,
        search, setSearch, planFilter, setPlanFilter,
        statusFilter, setStatusFilter, selectedRequest,
        openImageDialog, setOpenImageDialog,
        openReasonDialog, setOpenReasonDialog,
        openRejectDialog, setOpenRejectDialog,
        adminNote, setAdminNote,
        openTransactionDialog, setOpenTransactionDialog, plans,
        page,setPage,handleRowsPerPageChange,rowsPerPage
    } = useSubscriptionPage();

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
                                onClick={() => handleOpenReject(row)}
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
                    onClick={(e) =>
                        handleShowTransaction(e.transactionId)
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
                    onChange={(e) => {
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
            <TablePagination
                component="div"
                count={filteredRequests.length}
                page={page}
                onPageChange={(event, newPage) =>
                    setPage(newPage)
                }
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage="عدد العناصر:"
                sx={{
                    borderTop:
                        "1px solid rgba(255,255,255,0.08)",

                    "& .MuiTablePagination-toolbar": {
                        color: "text.primary",
                    },

                    "& .MuiIconButton-root": {
                        color: "text.primary",
                    },

                    "& .MuiSelect-select": {
                        color: "text.primary",
                    },
                }}
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
                        {selectedRequest}
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

            <Dialog
                open={openImageDialog}
                onClose={() =>
                    setOpenImageDialog(false)
                }
                maxWidth="md"
            >
                <DialogTitle>
                    صورة إثبات الدفع
                </DialogTitle>

                <DialogContent>

                    {selectedRequest && (
                        <Box
                            component="img"
                            src={buildImageUrl(
                                selectedRequest
                            )}
                            alt="proof"
                            sx={{
                                width: "100%",
                                maxHeight: "70vh",
                                objectFit: "contain",
                                borderRadius: 2,
                            }}
                        />
                    )}

                </DialogContent>
            </Dialog>
        </>
    )
}