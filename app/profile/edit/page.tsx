'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader } from "@/components/ui/page-header"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { BusinessProfile } from "@/types/profile"
import { setPriority } from "os"
import { FiCalendar, FiSearch } from "react-icons/fi"

export default function EditProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<BusinessProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://172.16.3.88:5000/profiles/1')
        if (!res.ok) throw new Error('Failed to fetch profile')
        const data = await res.json()
        setProfile(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    fetchProfile()
  }, [])

  const [prefix, setPrefix]=  useState<string>('us')
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!profile) return

    setIsLoading(true)
    try {
      const res = await fetch(`http://172.16.3.88:5000/profiles/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      })

      if (!res.ok) throw new Error('Failed to update profile')

      router.push('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => prev ? { ...prev, [name]: value } : null)
  }

  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State to hold the selected image

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(file);

      // Preview image using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => prev ? { ...prev, photourl: reader.result as string } : null); // Update profile state with the image URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle image upload logic here
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      try {
        const res = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to upload image");

        // Once uploaded, you might update the profile with the image URL
        const data = await res.json();
        setProfile(prev => prev ? { ...prev, photourl: data.url } : null); // Assuming response contains the image URL
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (!profile) return <div>Loading...</div>

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
                {profile.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        }
        rightContent={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" form="profile-form" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        }
      />

      <form id="profile-form" onSubmit={onSubmit} className="mt-6 space-y-8">
        <div className="border rounded-[10px] bg-white p-4">
        <Label className="text-base">Photo</Label>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6">
            <div className="relative h-12 w-12">
            <Image
                src={profile.photourl || "/globe.svg"}
                alt="Upload preview"
                className="rounded-full object-cover"
                fill
            />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
                Drag and drop image here, or click add image
            </p>
            <Button variant="outline" size="sm" type="button">
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="photo"
                name="photo"
                />
                <label htmlFor="photo" className="cursor-pointer">
                Replace image
                </label>
            </Button>
            </div>

            {/* Submit the form with the selected image */}
            {/* <Button type="submit" variant="outline" size="sm" disabled={!selectedImage}>
            Upload Image
            </Button> */}
        </form>
        </div>

        <div className="border rounded-[10px] bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="companyname">Company Name</Label>
              <Input
                id="companyname"
                name="companyname"
                value={profile.companyname}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="websiteurl">Website URL</Label>
              <Input
                id="websiteurl"
                name="websiteurl"
                value={profile.websiteurl}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="registrationnumber">Registration Number</Label>
              <Input
                id="registrationnumber"
                name="registrationnumber"
                value={profile.registrationnumber}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={profile.industry}
                onValueChange={(value) => handleSelectChange("industry", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="dateregistered">Date Registered</Label>
                <div className="relative mt-2">
                    <Input
                    id="dateregistered"
                    name="dateregistered"
                    type="string"
                    value={profile.dateregistered}
                    onChange={handleInputChange}
                    className="pl-10" // Add padding to the left for the icon
                    />
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
            </div>
            <div>
              <Label htmlFor="accounttype">Account Type</Label>
              <Select
                value={profile.accounttype}
                onValueChange={(value) => handleSelectChange("accounttype", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border rounded-[10px] bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phonenumber">Phone Number</Label>
              <div className="mt-2 flex">
                <Select
                  value={prefix}
                  onValueChange={(value) => setPrefix(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ae">UAE (+971)</SelectItem>
                    <SelectItem value="us">USA (+1)</SelectItem>
                    <SelectItem value="uk">UK (+44)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phonenumber"
                  name="phonenumber"
                  type="tel"
                  value={profile.phonenumber}
                  onChange={handleInputChange}
                  className="ml-2"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="streetaddress">Street Address</Label>
                <div className="relative mt-2">
                    <Input
                    id="streetaddress"
                    name="streetaddress"
                    value={profile.streetaddress}
                    onChange={handleInputChange}
                    className="pl-10" // Add padding to the left to make space for the icon
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
                <div className="">
                <Label htmlFor="city">City</Label>
                <Input
                    id="city"
                    name="city"
                    value={profile.city}
                    onChange={handleInputChange}
                    className="mt-2"
                />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
                <div className="">
                <Label htmlFor="state">State</Label>
                <Input
                    id="state"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    className="mt-2"
                />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
                <div className="sm:col-span-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                    id="zipcode"
                    name="zipcode"
                    value={profile.zipcode}
                    onChange={handleInputChange}
                    className="mt-2"
                />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
                <div className="sm:col-span-2">
                <Label htmlFor="countryregion">Country/Region</Label>
                <Input
                    id="countryregion"
                    name="countryregion"
                    value={profile.countryregion}
                    onChange={handleInputChange}
                    className="mt-2"
                />
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
