import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { Copy, ExternalLink } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { BusinessProfile } from "@/types/profile"

async function getProfile(id: number): Promise<BusinessProfile> {
    const res = await fetch(`http://172.16.3.88:5000/profiles/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
}

export default async function ProfilePage() {
    const profile = await getProfile(1);
    return (
        <div className="container max-w-5xl py-20">
        <PageHeader
            title={
                <div className="flex items-center gap-3">
                    <Image
                        src={profile.photourl || "/globe.svg"}
                        alt="Tech Innovation Inc"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold">{profile.companyname}</h2>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                        {profile.status || 'Active'}
                        </Badge>
                    </div>
                </div>
            }
            rightContent={
                <>
                <div className="flex gap-3">
                    <Button variant="outline">Register business account</Button>
                    <Button asChild>
                    <Link href="/profile/edit">Edit</Link>
                    </Button>
                </div>
                </>
            }
        />

        <div className="mt-6">

            <div className="space-y-8">
            <section className="p-4 border rounded-[10px] bg-white">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label className="text-sm text-muted-foreground">Company Name</label>
                    <p className="mt-1">{profile.companyname}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Website URL</label>
                    <div className="mt-1 flex items-center gap-2">
                    <a href={profile.websiteurl} className="text-blue-600 hover:underline">
                        {profile.websiteurl}
                    </a>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Account Type</label>
                    <p className="mt-1">{profile.accounttype}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Account Plan</label>
                    <p className="mt-1">{profile.accountplan || 'Plus +'}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Industry</label>
                    <p className="mt-1">{profile.industry}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Registration Number</label>
                    <p className="mt-1">{profile.registrationnumber}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Date Registered</label>
                    <p className="mt-1">{profile.dateregistered}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Last Login</label>
                    <p className="mt-1">{profile.lastlogin || '2024-12-04  20:21:40'}</p>
                </div>
                </div>
            </section>

            <section  className="p-4 border rounded-[10px] bg-white">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label className="text-sm text-muted-foreground">Email Address</label>
                    <div className="mt-1 flex items-center gap-2">
                    <p className="text-blue-600">{profile.email}</p>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Phone Number</label>
                    <div className="mt-1 flex items-center gap-2">
                    <p className="text-blue-600">{profile.phonenumber}</p>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label className="text-sm text-muted-foreground">Address</label>
                    <p className="mt-1">{profile.streetaddress + ', ' + profile.city + ', ' + profile.state + ', ' + profile.countryregion}</p>
                </div>
                </div>
            </section>
            </div>
        </div>
        </div>
    )
}

