"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Support() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Support</h2>
      <p className="text-sm text-gray-500">Get help with using FeedSmart.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Reach out to our team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone Support</p>
                  <p className="text-sm text-gray-500">+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-sm text-gray-500">support@feedsmart.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Live Chat</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Contact Support</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
            <CardDescription>Frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">How accurate is the feed analysis?</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Our AI model has been trained on thousands of feed samples and provides approximately 90-95% accuracy
                  compared to laboratory testing.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Can I analyze any type of feed?</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Yes, FeedSmart can analyze most common livestock feeds including grains, forages, silages, and mixed
                  rations.
                </p>
              </div>
              <div>
                <h4 className="font-medium">How long does analysis take?</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Most analyses are completed within 1-2 minutes after uploading your image.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All FAQs
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Tutorials</CardTitle>
          <CardDescription>Learn how to use FeedSmart</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

