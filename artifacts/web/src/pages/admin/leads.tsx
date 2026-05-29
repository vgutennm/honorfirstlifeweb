import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAdminStats, useListLeads, getListLeadsQueryKey, getAdminStatsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Loader2, Users, Phone, Zap, FileText, Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_OPTIONS = [
  "New", "Hot / Call Now", "Contacted", "Appointment Set", 
  "No Answer", "Bad Number", "Not Licensed State", 
  "Not Qualified / Nurture", "Application Started", 
  "Submitted", "Issued", "Cancelled / Chargeback Risk"
];

export default function AdminLeads() {
  const { data: stats, isLoading: statsLoading } = useAdminStats({
    query: { queryKey: getAdminStatsQueryKey() }
  });

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const { data: leads, isLoading: leadsLoading } = useListLeads(
    {
      status: statusFilter !== "all" ? statusFilter : undefined,
      search: search || undefined
    },
    {
      query: { queryKey: getListLeadsQueryKey({
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search || undefined
      }) }
    }
  );

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy mb-6">Dashboard Overview</h1>
        
        {statsLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard title="Leads Today" value={stats.leadsToday} icon={<Users className="h-5 w-5 text-blue-500" />} />
            <MetricCard title="Hot / ASAP Leads" value={stats.hotLeads + stats.asapCalls} icon={<Zap className="h-5 w-5 text-amber-500" />} />
            <MetricCard title="Total Leads" value={stats.totalLeads} icon={<FileText className="h-5 w-5 text-gray-500" />} />
            <MetricCard title="Actions Clicked" value={stats.callsClicked + stats.textsClicked} icon={<Phone className="h-5 w-5 text-green-500" />} />
          </div>
        ) : null}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-semibold text-navy">All Leads</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search name, phone..." 
                className="pl-8 bg-white"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUS_OPTIONS.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <a href="/api/admin/export" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-gray-100 h-10 px-4 py-2 shrink-0">
              <Download className="h-4 w-4 mr-2" /> Export
            </a>
          </div>
        </div>

        <div className="overflow-x-auto">
          {leadsLoading ? (
             <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>
          ) : leads && leads.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50/50">
                    <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                      {format(new Date(lead.createdAt), "MMM d, h:mm a")}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-navy">{lead.firstName} {lead.lastName}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {lead.state} {lead.zip}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="truncate max-w-[150px]" title={lead.productInterest || ""}>
                        {lead.productInterest || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">{lead.leadScore}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={lead.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/leads/${lead.id}`} className="text-sm text-trustblue hover:underline font-medium">
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No leads found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function MetricCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-md">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-navy">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let colorClass = "bg-gray-100 text-gray-800";
  
  if (status === "New") colorClass = "bg-blue-100 text-blue-800";
  else if (status === "Hot / Call Now") colorClass = "bg-red-100 text-red-800 border border-red-200";
  else if (status === "Contacted") colorClass = "bg-purple-100 text-purple-800";
  else if (status === "Appointment Set") colorClass = "bg-emerald-100 text-emerald-800";
  else if (status === "Submitted" || status === "Issued") colorClass = "bg-green-100 text-green-800";
  else if (status.includes("Bad") || status.includes("Not")) colorClass = "bg-slate-100 text-slate-600";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass} whitespace-nowrap`}>
      {status}
    </span>
  );
}
