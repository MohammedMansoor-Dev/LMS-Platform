import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {

    const [loginInput, setLoginInput] = useState({ email: '', password: '' })
    const [signupInput, setSignupInput] = useState({ name: '', email: '', password: '' })

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation()
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, loginIsSuccess: loginIsSuccess }] = useLoginUserMutation()

    const navigate = useNavigate()

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target
        if (type === 'signup') {
            setSignupInput({ ...signupInput, [name]: value })
        } else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }

    const handleSubmit = async (type) => {
        const inputData = type === 'signup' ? signupInput : loginInput
        const action = type === 'signup' ? registerUser : loginUser
        await action(inputData)
    }

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData?.message || 'Signup Successfully')
        }
        if (registerError) {
            toast.error(registerData?.data?.message || 'Signup Failed')
        }
        if (loginIsSuccess || loginData) {
            toast.success(loginData?.message || 'Login Successfully')
            navigate('/')
        }
        if (loginError) {
            toast.error(loginData?.data?.message || 'Login Failed')
        }
    }, [registerData, registerError, registerIsLoading, registerIsSuccess, loginData, loginError, loginIsLoading, loginIsSuccess])

    return (
        <div className="flex items-center justify-center w-full h-full mt-20">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input name='name' type='text' value={signupInput.name} onChange={(e) => changeInputHandler(e, 'signup')} id="name" placeholder='Enter your Name' required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input name='email' type='email' value={signupInput.email} onChange={(e) => changeInputHandler(e, 'signup')} id="email" placeholder='Enter your Email' required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input name='password' type='password' value={signupInput.password} onChange={(e) => changeInputHandler(e, 'signup')} id="password" placeholder='Enter your Password' required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => { handleSubmit('signup') }}>
                                {
                                    registerIsLoading ?
                                        (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                            </>
                                        ) : 'Signup'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your account here. After Signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input value={loginInput.email} name='email' id="email" onChange={(e) => changeInputHandler(e, 'login')} type="email" placeholder='Enter your Email' required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input value={loginInput.password} name='password' id="password" onChange={(e) => changeInputHandler(e, 'login')} type="password" placeholder='Enter your Password' required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => { handleSubmit('login') }}>
                                {
                                    loginIsLoading ?
                                        (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                                            </>
                                        ) : 'Login'
                                }</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login