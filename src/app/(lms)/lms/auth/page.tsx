'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Loader2, 
  Eye, 
  EyeOff, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  KeyRound,
  Mail,
  Lock,
  User,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '@/components/lms/auth/AuthProvider'
import { z } from 'zod'

// Enhanced validation schemas
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

interface FormData {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  acceptTerms?: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function AuthPage() {
  const router = useRouter()
  const { signIn, signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTime, setLockoutTime] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // Session timeout warning
  useEffect(() => {
    const sessionWarning = () => {
      // This would integrate with your auth system
      console.log('Session timeout warning')
    }

    // Check for existing lockout
    const storedLockout = localStorage.getItem('auth-lockout')
    if (storedLockout) {
      const lockoutData = JSON.parse(storedLockout)
      const now = Date.now()
      if (now < lockoutData.until) {
        setIsLocked(true)
        setLockoutTime(Math.ceil((lockoutData.until - now) / 1000))
      } else {
        localStorage.removeItem('auth-lockout')
      }
    }

    // Check login attempts
    const attempts = localStorage.getItem('login-attempts')
    if (attempts) {
      setLoginAttempts(parseInt(attempts))
    }
  }, [])

  // Lockout countdown
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1)
        if (lockoutTime <= 1) {
          setIsLocked(false)
          localStorage.removeItem('auth-lockout')
          setLoginAttempts(0)
          localStorage.removeItem('login-attempts')
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [lockoutTime])

  const validateField = (name: string, value: any, schema: z.ZodSchema) => {
    try {
      schema.parse({ [name]: value })
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    } catch (err) {
      if (err instanceof z.ZodError) {
        setFormErrors(prev => ({ 
          ...prev, 
          [name]: err.errors[0]?.message || 'Invalid input' 
        }))
      }
    }
  }

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouchedFields(prev => new Set(prev).add(name))
    
    // Real-time validation
    if (name === 'email') {
      const emailSchema = z.string().email()
      validateField(name, value, emailSchema)
    } else if (name === 'password' && formData.confirmPassword) {
      // Validate password strength and confirm password match
      validatePasswords(value, formData.confirmPassword)
    } else if (name === 'confirmPassword') {
      validatePasswords(formData.password, value)
    }
  }

  const validatePasswords = (password: string, confirmPassword: string) => {
    const passwordSchema = z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    
    try {
      passwordSchema.parse(password)
      setFormErrors(prev => ({ ...prev, password: '' }))
    } catch (err) {
      if (err instanceof z.ZodError) {
        setFormErrors(prev => ({ 
          ...prev, 
          password: err.errors[0]?.message || 'Invalid password' 
        }))
      }
    }

    if (confirmPassword && password !== confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords don't match" }))
    } else {
      setFormErrors(prev => ({ ...prev, confirmPassword: '' }))
    }
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' }
    
    let strength = 0
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ]
    
    strength = checks.filter(Boolean).length
    
    const levels = [
      { strength: 1, label: 'Very Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Weak', color: 'bg-orange-500' },
      { strength: 3, label: 'Fair', color: 'bg-yellow-500' },
      { strength: 4, label: 'Good', color: 'bg-blue-500' },
      { strength: 5, label: 'Strong', color: 'bg-green-500' }
    ]
    
    return levels.find(level => level.strength === strength) || levels[0]
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLocked) {
      setError(`Account locked. Try again in ${lockoutTime} seconds.`)
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      signInSchema.parse(formData)
      
      await signIn(formData.email, formData.password)
      
      // Reset attempts on successful login
      setLoginAttempts(0)
      localStorage.removeItem('login-attempts')
      
      if (rememberMe) {
        localStorage.setItem('remember-me', 'true')
      }
      
      setSuccess('Sign in successful! Redirecting...')
      setTimeout(() => router.push('/lms/dashboard'), 1500)
    } catch (err) {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)
      localStorage.setItem('login-attempts', newAttempts.toString())
      
      if (newAttempts >= 5) {
        const lockUntil = Date.now() + (5 * 60 * 1000) // 5 minutes
        localStorage.setItem('auth-lockout', JSON.stringify({ until: lockUntil }))
        setIsLocked(true)
        setLockoutTime(300) // 5 minutes in seconds
        setError('Too many failed attempts. Account locked for 5 minutes.')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to sign in')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      signUpSchema.parse(formData)
      
      await signUp(formData.email, formData.password)
      
      setSuccess('Account created! Please check your email for verification.')
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: FormErrors = {}
        err.errors.forEach(error => {
          const field = error.path[0] as string
          fieldErrors[field] = error.message
        })
        setFormErrors(fieldErrors)
      } else {
        setError(err instanceof Error ? err.message : 'Failed to sign up')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first')
      return
    }
    
    try {
      // This would call your password reset API
      setSuccess('Password reset email sent! Check your inbox.')
    } catch (err) {
      setError('Failed to send password reset email')
    }
  }

  const passwordStrength = getPasswordStrength(formData.password || '')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            LMS Access
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Secure access to your learning management system
          </p>
        </CardHeader>
        <CardContent>
          {isLocked && (
            <Alert variant="destructive" className="mb-4">
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Account temporarily locked. Try again in {Math.floor(lockoutTime / 60)}:
                {(lockoutTime % 60).toString().padStart(2, '0')}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" disabled={isLocked}>
                <Mail className="h-4 w-4 mr-2" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" disabled={isLocked}>
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLocked}
                    className={formErrors.email ? 'border-red-500' : ''}
                    aria-describedby={formErrors.email ? 'signin-email-error' : undefined}
                    required
                  />
                  {formErrors.email && (
                    <p id="signin-email-error" className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                      disabled={isLocked}
                      className={formErrors.password ? 'border-red-500' : ''}
                      aria-describedby={formErrors.password ? 'signin-password-error' : undefined}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formErrors.password && (
                    <p id="signin-password-error" className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      disabled={isLocked}
                    />
                    <Label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={handleForgotPassword}
                    disabled={isLocked}
                    className="p-0 h-auto"
                  >
                    Forgot password?
                  </Button>
                </div>

                {loginAttempts > 0 && loginAttempts < 5 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {5 - loginAttempts} attempts remaining before account lock
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || isLocked}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstname">First Name</Label>
                    <Input
                      id="signup-firstname"
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => handleFieldChange('firstName', e.target.value)}
                      placeholder="John"
                      disabled={isLocked}
                      className={formErrors.firstName ? 'border-red-500' : ''}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="text-xs text-red-500">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-lastname">Last Name</Label>
                    <Input
                      id="signup-lastname"
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => handleFieldChange('lastName', e.target.value)}
                      placeholder="Doe"
                      disabled={isLocked}
                      className={formErrors.lastName ? 'border-red-500' : ''}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="text-xs text-red-500">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLocked}
                    className={formErrors.email ? 'border-red-500' : ''}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                      disabled={isLocked}
                      className={formErrors.password ? 'border-red-500' : ''}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(passwordStrength.strength / 5) * 100} 
                          className="flex-1 h-2"
                        />
                        <Badge variant="outline" className={`text-xs ${passwordStrength.color.replace('bg-', 'text-')}`}>
                          {passwordStrength.label}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          {formData.password.length >= 8 ? 
                            <CheckCircle className="h-3 w-3 text-green-500" /> : 
                            <XCircle className="h-3 w-3 text-red-500" />
                          }
                          At least 8 characters
                        </div>
                        <div className="flex items-center gap-1">
                          {/[A-Z]/.test(formData.password) ? 
                            <CheckCircle className="h-3 w-3 text-green-500" /> : 
                            <XCircle className="h-3 w-3 text-red-500" />
                          }
                          Uppercase letter
                        </div>
                        <div className="flex items-center gap-1">
                          {/[a-z]/.test(formData.password) ? 
                            <CheckCircle className="h-3 w-3 text-green-500" /> : 
                            <XCircle className="h-3 w-3 text-red-500" />
                          }
                          Lowercase letter
                        </div>
                        <div className="flex items-center gap-1">
                          {/[0-9]/.test(formData.password) ? 
                            <CheckCircle className="h-3 w-3 text-green-500" /> : 
                            <XCircle className="h-3 w-3 text-red-500" />
                          }
                          Number
                        </div>
                        <div className="flex items-center gap-1">
                          {/[^A-Za-z0-9]/.test(formData.password) ? 
                            <CheckCircle className="h-3 w-3 text-green-500" /> : 
                            <XCircle className="h-3 w-3 text-red-500" />
                          }
                          Special character
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formErrors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword || ''}
                      onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                      disabled={isLocked}
                      className={formErrors.confirmPassword ? 'border-red-500' : ''}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accept-terms"
                    checked={formData.acceptTerms || false}
                    onCheckedChange={(checked) => handleFieldChange('acceptTerms', checked)}
                    disabled={isLocked}
                    className={formErrors.acceptTerms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="accept-terms" className="text-sm">
                    I accept the{' '}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Terms of Service
                    </Button>
                    {' '}and{' '}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                {formErrors.acceptTerms && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {formErrors.acceptTerms}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || isLocked}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          {/* Social Login Section */}
          <div className="space-y-2">
            <p className="text-sm text-center text-muted-foreground">Or continue with</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" disabled={isLocked}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" disabled={isLocked}>
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-12.014C24.007 5.36 18.641.001 12.017.001z"/>
                </svg>
                Microsoft
              </Button>
            </div>
          </div>

          {error && (
            <Alert className="mt-4" variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4" variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
