import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAdminStats, useListLeads, useUpdateLead, getGetLeadQueryKey, useGetLead, useDeleteLead } from "@workspace/api-client-react";
import { Link, useParams, useLocation } from "wouter";
import { Loader2, Phone, MessageSquare, ArrowLeft, Copy, Trash2, Calendar, Shield, Activity, Save } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";

const STATUS_OPTIONS = [
  "New", "Hot / Call Now", "Contacted", "Appointment Set", 
  "No Answer", "Bad Number", "Not Licensed State", 
  "Not Qualified / Nurture", "Application Started", 
  "Submitted", "Issued", "Cancelled / Chargeback Risk"
];

export default function AdminLeadDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: detailData, isLoading } = useGetLead(id, {
    query: { enabled: !!id, queryKey: getGetLeadQueryKey(id) }
  });

  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();

  const [status, setStatus] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state when data loads
  if (detailData && !isEditing) {
    setStatus(detailData.lead.status || "");
    setQuality(detailData.lead.leadQuality || "");
    setOutcome(detailData.lead.outcome || "");
    setNotes(detailData.lead.adminNotes || "");
    setIsEditing(true);
  }

  if (isLoading || !detailData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-navy" />
        </div>
      </AdminLayout>
    );
  }

  const lead = detailData.lead;
  const events = detailData.events || [];

  const handleSave = () => {
    updateMutation.mutate(
      { 
        id, 
        data: { 
          status, 
          leadQuality: quality, 
          outcome, 
          adminNotes: notes 
        } 
      },
      {
        onSuccess: () => {
          toast({ title: "Lead updated successfully" });
          queryClient.invalidateQueries({ queryKey: getGetLeadQueryKey(id) });
        },
        onError: () => {
          toast({ title: "Failed to update lead", variant: "destructive" });
        }
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Lead deleted" });
          setLocation("/admin/leads");
        },
        onError: () => {
          toast({ title: "Failed to delete lead", variant: "destructive" });
        }
      }
    );
  };

  const copyDetails = () => {
    const details = `
Name: ${lead.firstName} ${lead.lastName}
Phone: ${lead.phone}
Email: ${lead.email || 'N/A'}
State: ${lead.state}
Age: ${lead.ageRange || 'N/A'}
Veteran: ${lead.veteranStatus || 'N/A'}
Branch: ${lead.branch || 'N/A'}
Interest: ${lead.productInterest || 'N/A'}
Coverage: ${lead.desiredCoverageRange || 'N/A'}
Health: ${lead.generalHealthRange || 'N/A'}
    `.trim();
    
    navigator.clipboard.writeText(details);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/leads" className="text-muted-foreground hover:text-navy">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
            {lead.firstName} {lead.lastName}
            <Badge variant={lead.status === 'New' || lead.status === 'Hot / Call Now' ? 'default' : 'secondary'} className="text-xs">
              Score: {lead.leadScore}
            </Badge>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyDetails}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the lead
                  and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                  Delete Lead
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-trustblue" /> Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-lg">{lead.phone}</p>
                <div className="flex gap-2 mt-2">
                  <a href={`tel:${lead.phone}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3">
                    Call
                  </a>
                  <a href={`sms:${lead.phone}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    Text
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{lead.email || "Not provided"}</p>
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="text-sm text-trustblue hover:underline mt-1 inline-block">Send Email</a>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{lead.state} {lead.zip}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferences</p>
                <p className="font-medium">{lead.contactPreference} | {lead.bestContactTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-navy" /> Profile Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Veteran Status</p>
                <p className="font-medium">{lead.veteranStatus || "N/A"} - {lead.branch}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Age & Health</p>
                <p className="font-medium">{lead.ageRange || "N/A"} | {lead.generalHealthRange}</p>
                {lead.tobaccoStatus && <p className="text-sm text-muted-foreground mt-1">Tobacco: {lead.tobaccoStatus}</p>}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Interest</p>
                <p className="font-medium">{lead.productInterest || "N/A"}</p>
                <p className="text-sm text-muted-foreground mt-1">Reason: {lead.reasonForInterest}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Coverage Details</p>
                <p className="font-medium">{lead.desiredCoverageRange || "N/A"}</p>
                <p className="text-sm text-muted-foreground mt-1">Beneficiary: {lead.beneficiaryType}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" /> Tracking Data
            </h2>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>Submitted: {format(new Date(lead.createdAt), "PPpp")}</p>
              <p>Source: {lead.utmSource || "direct"} / {lead.utmMedium || "none"}</p>
              <p>Campaign: {lead.utmCampaign || "none"}</p>
              <p>Consent: {lead.consentContact ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4">Lead Management</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Lead Quality</label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unrated" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Lead</SelectItem>
                    <SelectItem value="bad">Bad / Unqualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Outcome</label>
                <Input value={outcome} onChange={e => setOutcome(e.target.value)} placeholder="e.g. Sold $15k FE policy" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Admin Notes</label>
                <Textarea 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="Add notes about this lead..." 
                  className="min-h-[120px]"
                />
              </div>

              <Button onClick={handleSave} className="w-full" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4">Timeline</h2>
            <div className="space-y-4">
              {events.length > 0 ? events.map((event, i) => (
                <div key={event.id} className="relative pl-6 border-l-2 border-gray-200 pb-4 last:pb-0">
                  <div className="absolute w-3 h-3 bg-navy rounded-full -left-[7px] top-1"></div>
                  <p className="text-sm font-medium capitalize">{event.eventType.replace(/_/g, ' ')}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(event.createdAt), "MMM d, h:mm a")}</p>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No events recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
