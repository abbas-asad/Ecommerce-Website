import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function Authpage() {
  return (
    <div className="container mx-auto px-medium lg:px-large py-16">
      <div className="grid md:grid-cols-2 gap-16 ">
        {/* Login Form */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Log In</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="login-email">
                Username or email address
              </label>
              <Input id="login-email" type="text" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="login-password">
                Password
              </label>
              <Input id="login-password" type="password" className="w-full" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <Button className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white">
              Log In
            </Button>
            <div className="text-sm">
              <Link href="#" className="text-gray-600 hover:underline">
                Lost Your Password?
              </Link>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Register</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="register-email">
                Email address
              </label>
              <Input id="register-email" type="email" className="w-full" />
            </div>
            <p className="text-sm text-gray-600">
              A link to set a new password will be sent to your email address.
            </p>
            <p className="text-sm text-gray-600">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account,
              and for other purposes described in our{' '}
              <Link href="#" className="text-black hover:underline">
                privacy policy
              </Link>
              .
            </p>
            <Button className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

