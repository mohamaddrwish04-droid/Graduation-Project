import { useState, useEffect } from "react";
import {
    subscriptionPaymentRequestsReject,
    subscriptionPaymentRequestsApprove,
    subscriptionPaymentRequestsPending,
    subscriptionPaymentRequests
} from "../../services/subscriptionService";
import { getSubscriptionPlans } from "../../services/subscriptionPlanService";



export function useSubscriptionPage() {
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
    const [plans, setPlans] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
            const requestsData = await subscriptionPaymentRequests();
            const plansData = await getSubscriptionPlans();
            setRequests(requestsData.items);
            setFilteredRequests(requestsData.items);
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
        setSelectedRequest(row.proofImageUrl);
        setOpenImageDialog(true);
    };
    const paginatedRequest = filteredRequests.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    useEffect(() => {
        setPage(0);
    }, [
        search,
        statusFilter,
        plans,
    ]);
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return {
        handleApprove, handleReject, handleShowImage,
        handleShowTransaction, handleShowReason, handleOpenReject,
        requests, approvedRequests, rejectedRequests, pendingRequests,
        totalRequests, filteredRequests, setFilteredRequests,
        search, setSearch, planFilter, setPlanFilter,
        statusFilter, setStatusFilter, selectedRequest, setSelectedRequest,
        openImageDialog, setOpenImageDialog,
        openReasonDialog, setOpenReasonDialog,
        openRejectDialog, setOpenRejectDialog,
        openTransactionDialog, setOpenTransactionDialog, plans,
        adminNote, setAdminNote,handleRowsPerPageChange,paginatedRequest,
        page,setPage,rowsPerPage
    }


}