"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Studio } from "@/components/studio-card";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Music Suite",
  "Podcast Lounge",
  "Workshop",
];

const fieldClassName =
  "h-11 border-input bg-background text-foreground placeholder:text-muted-foreground";

const labelClassName = "text-[13px] font-normal text-muted-foreground";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [rows, setRows] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [editing, setEditing] = useState<Studio | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Photo Studio",
    location: "",
    price: "",
    securityDeposit: "",
    capacity: "",
    overview: "",
    image: "",
  });

  const loadListings = useCallback(async () => {
    try {
      const res = await fetch("/api/studios?mine=1");
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as Studio[];
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("load listings failed:", err);
      toast.error("Could not load your listings.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.replace("/login");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/studios?mine=1");
        if (res.status === 401) {
          if (!cancelled) router.replace("/login");
          return;
        }
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as Studio[];
        if (!cancelled) setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("load listings failed:", err);
        if (!cancelled) toast.error("Could not load your listings.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isPending, session, router]);

  const confirmDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/studios/${target.id}`, {
        method: "DELETE",
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        toast.error(data?.error ?? "Could not delete the studio.");
        return;
      }

      setRows((current) => current.filter((entry) => entry.id !== target.id));
      toast.success(`"${target.title}" was deleted.`);
      setTarget(null);
    } catch (err) {
      console.error("delete studio failed:", err);
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const openEdit = (studio: Studio) => {
    setEditing(studio);
    setForm({
      title: studio.title,
      category: studio.category,
      location: studio.location,
      price: String(studio.price),
      securityDeposit: String(studio.securityDeposit ?? ""),
      capacity: String(studio.capacity ?? ""),
      overview: studio.overview ?? "",
      image: studio.image ?? "",
    });
  };

  const saveEdit = async () => {
    if (!editing) return;

    const price = Number(form.price);
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!form.location.trim()) {
      toast.error("Location is required.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid hourly rate.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/studios/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category,
          location: form.location.trim(),
          price,
          ...(form.securityDeposit
            ? { securityDeposit: Number(form.securityDeposit) }
            : {}),
          ...(form.capacity ? { capacity: Number(form.capacity) } : {}),
          ...(form.overview.trim() ? { overview: form.overview.trim() } : {}),
          ...(form.image.trim() ? { image: form.image.trim() } : {}),
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
        id?: string;
      } | null;

      if (!res.ok) {
        toast.error(data?.error ?? "Could not update the studio.");
        return;
      }

      toast.success("Listing updated.");
      setEditing(null);
      await loadListings();
    } catch (err) {
      console.error("update studio failed:", err);
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || (loading && !session?.user)) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Skeleton className="h-10 w-72" />
          <div className="mt-8 space-y-3 rounded-xl border border-border bg-card p-5">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-bold tracking-tight">
            My Studio Listings
          </h1>
          <Button
            render={<a href="/add-studio" />}
            nativeButton={false}
            className="bg-amber-400 text-black hover:bg-amber-300"
          >
            Add New Studio
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 space-y-3 rounded-xl border border-border bg-card p-5">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-16 rounded-xl border border-border bg-card py-16 text-center text-muted-foreground">
            You haven&apos;t listed any studios yet.
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-5 py-4 font-normal">Image</th>
                    <th className="px-5 py-4 font-normal">Title</th>
                    <th className="px-5 py-4 font-normal">Category</th>
                    <th className="px-5 py-4 font-normal">Rate</th>
                    <th className="px-5 py-4 font-normal">Location</th>
                    <th className="px-5 py-4 text-right font-normal">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((studio) => (
                    <tr
                      key={studio.id}
                      className="border-b border-border/60 last:border-b-0"
                    >
                      <td className="px-5 py-4">
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-gradient-to-br from-amber-800/80 via-muted to-muted-foreground/30">
                          {studio.image ? (
                            <Image
                              src={studio.image}
                              alt={studio.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">
                        {studio.title}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {studio.category}
                      </td>
                      <td className="px-5 py-4 text-foreground">
                        ${studio.price} / hr
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {studio.location}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => openEdit(studio)}
                          >
                            Update
                          </Button>
                          <Button
                            type="button"
                            className="bg-red-600 text-white hover:bg-red-500"
                            onClick={() => setTarget(studio)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Dialog
        open={target !== null}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="gap-4 bg-popover p-6 text-popover-foreground ring-border sm:max-w-md"
        >
          <DialogTitle className="text-center text-xl leading-normal font-bold text-foreground">
            Delete this studio?
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-muted-foreground">
            {target?.title} will be removed permanently. This action cannot be
            undone.
          </DialogDescription>
          <div className="flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setTarget(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-600 text-white hover:bg-red-500"
              onClick={() => void confirmDelete()}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto gap-4 bg-popover p-6 text-popover-foreground ring-border sm:max-w-lg">
          <DialogTitle className="text-xl font-bold text-foreground">
            Update studio
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Edit the details of &quot;{editing?.title}&quot;.
          </DialogDescription>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title" className={labelClassName}>
                Title
              </Label>
              <Input
                id="edit-title"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category" className={labelClassName}>
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    category: typeof value === "string" ? value : current.category,
                  }))
                }
              >
                <SelectTrigger
                  id="edit-category"
                  className="h-11 border-input bg-background text-foreground data-[size=default]:h-11"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground ring-border">
                  {categories.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="focus:bg-accent focus:text-accent-foreground"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-location" className={labelClassName}>
                Location
              </Label>
              <Input
                id="edit-location"
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                className={fieldClassName}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="edit-rate" className={labelClassName}>
                  Rate ($)
                </Label>
                <Input
                  id="edit-rate"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-deposit" className={labelClassName}>
                  Deposit ($)
                </Label>
                <Input
                  id="edit-deposit"
                  type="number"
                  min={0}
                  value={form.securityDeposit}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      securityDeposit: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-capacity" className={labelClassName}>
                  Capacity
                </Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      capacity: event.target.value,
                    }))
                  }
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-overview" className={labelClassName}>
                Overview
              </Label>
              <Textarea
                id="edit-overview"
                value={form.overview}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    overview: event.target.value,
                  }))
                }
                className="min-h-24 border-input bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-image" className={labelClassName}>
                Image URL
              </Label>
              <Input
                id="edit-image"
                type="url"
                value={form.image}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    image: event.target.value,
                  }))
                }
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(null)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => void saveEdit()}
              disabled={saving}
              className="bg-amber-400 text-black hover:bg-amber-300"
            >
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
