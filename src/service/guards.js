import { AuthGuard } from './AuthGuard';
import { AdminGuard } from './AdminGuard';
import { SubscriptionGuard } from './SubscriptionGuard';
import { OnboardingGuard } from './OnboardingGuard';

export const guardComponents = {
  auth: AuthGuard,
  admin: AdminGuard,
  subscription: SubscriptionGuard,
  onboarding: OnboardingGuard
};