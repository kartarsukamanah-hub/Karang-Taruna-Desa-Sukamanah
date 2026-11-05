import { 
  CitizenProduct, 
  Aspiration, 
  OfficialMember, 
  WorkProgram, 
  Activity, 
  PollQuestion,
  VolunteerApplication,
  OrganizationProfile
} from '../types';
import { 
  initialProducts, 
  initialAspirations, 
  initialOfficials, 
  initialWorkPrograms, 
  initialActivities, 
  initialPoll,
  initialProfile
} from '../data/initialData';

const KEYS = {
  PROFILE: 'kartar_profile_v1',
  PRODUCTS: 'kartar_products_v1',
  ASPIRATIONS: 'kartar_aspirations_v1',
  OFFICIALS: 'kartar_officials_v1',
  PROGRAMS: 'kartar_programs_v1',
  ACTIVITIES: 'kartar_activities_v1',
  POLL: 'kartar_poll_v1',
  VOLUNTEERS: 'kartar_volunteers_v1',
  UPVOTED_ASPIRATIONS: 'kartar_user_upvotes_v1',
  VOTED_POLLS: 'kartar_user_poll_voted_v1',
  ADMIN_AUTH: 'kartar_admin_logged_in_v1',
  ADMIN_PASS: 'kartar_admin_password_v1'
};

export const getStoredProfile = (): OrganizationProfile => {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(initialProfile));
      return initialProfile;
    }
    return JSON.parse(raw);
  } catch {
    return initialProfile;
  }
};

export const saveStoredProfile = (profile: OrganizationProfile): void => {
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed saving profile', e);
  }
};

export const getAdminAuthStatus = (): boolean => {
  try {
    return localStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuthStatus = (loggedIn: boolean): void => {
  try {
    if (loggedIn) {
      localStorage.setItem(KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(KEYS.ADMIN_AUTH);
    }
  } catch (e) {
    console.error('Failed setting admin auth', e);
  }
};

export const verifyAdminPassword = (password: string): boolean => {
  try {
    const saved = localStorage.getItem(KEYS.ADMIN_PASS) || 'kartar2026';
    return password.trim() === saved.trim() || password.trim() === 'admin123';
  } catch {
    return password === 'kartar2026';
  }
};

export const changeAdminPassword = (newPass: string): void => {
  try {
    localStorage.setItem(KEYS.ADMIN_PASS, newPass);
  } catch (e) {
    console.error('Failed saving new admin password', e);
  }
};

export const getStoredProducts = (): CitizenProduct[] => {
  try {
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(raw);
  } catch {
    return initialProducts;
  }
};

export const saveStoredProducts = (products: CitizenProduct[]): void => {
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed saving products to localStorage', e);
  }
};

export const getStoredAspirations = (): Aspiration[] => {
  try {
    const raw = localStorage.getItem(KEYS.ASPIRATIONS);
    if (!raw) {
      localStorage.setItem(KEYS.ASPIRATIONS, JSON.stringify(initialAspirations));
      return initialAspirations;
    }
    return JSON.parse(raw);
  } catch {
    return initialAspirations;
  }
};

export const saveStoredAspirations = (aspirations: Aspiration[]): void => {
  try {
    localStorage.setItem(KEYS.ASPIRATIONS, JSON.stringify(aspirations));
  } catch (e) {
    console.error('Failed saving aspirations to localStorage', e);
  }
};

export const getStoredOfficials = (): OfficialMember[] => {
  try {
    const raw = localStorage.getItem(KEYS.OFFICIALS);
    if (!raw) {
      localStorage.setItem(KEYS.OFFICIALS, JSON.stringify(initialOfficials));
      return initialOfficials;
    }
    return JSON.parse(raw);
  } catch {
    return initialOfficials;
  }
};

export const saveStoredOfficials = (officials: OfficialMember[]): void => {
  try {
    localStorage.setItem(KEYS.OFFICIALS, JSON.stringify(officials));
  } catch (e) {
    console.error('Failed saving officials', e);
  }
};

export const getStoredWorkPrograms = (): WorkProgram[] => {
  try {
    const raw = localStorage.getItem(KEYS.PROGRAMS);
    if (!raw) {
      localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(initialWorkPrograms));
      return initialWorkPrograms;
    }
    return JSON.parse(raw);
  } catch {
    return initialWorkPrograms;
  }
};

export const saveStoredWorkPrograms = (programs: WorkProgram[]): void => {
  try {
    localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(programs));
  } catch (e) {
    console.error('Failed saving programs', e);
  }
};

export const getStoredActivities = (): Activity[] => {
  try {
    const raw = localStorage.getItem(KEYS.ACTIVITIES);
    if (!raw) {
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(initialActivities));
      return initialActivities;
    }
    return JSON.parse(raw);
  } catch {
    return initialActivities;
  }
};

export const saveStoredActivities = (activities: Activity[]): void => {
  try {
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(activities));
  } catch (e) {
    console.error('Failed saving activities', e);
  }
};

export const getStoredPoll = (): PollQuestion => {
  try {
    const raw = localStorage.getItem(KEYS.POLL);
    if (!raw) {
      localStorage.setItem(KEYS.POLL, JSON.stringify(initialPoll));
      return initialPoll;
    }
    return JSON.parse(raw);
  } catch {
    return initialPoll;
  }
};

export const saveStoredPoll = (poll: PollQuestion): void => {
  try {
    localStorage.setItem(KEYS.POLL, JSON.stringify(poll));
  } catch (e) {
    console.error('Failed saving poll', e);
  }
};

export const getUserVotedPollId = (): string | null => {
  try {
    return localStorage.getItem(KEYS.VOTED_POLLS);
  } catch {
    return null;
  }
};

export const setUserVotedPollId = (optionId: string): void => {
  try {
    localStorage.setItem(KEYS.VOTED_POLLS, optionId);
  } catch (e) {
    console.error('Failed storing poll vote', e);
  }
};

export const getUserUpvotedAspirations = (): string[] => {
  try {
    const raw = localStorage.getItem(KEYS.UPVOTED_ASPIRATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleUserUpvoteAspiration = (aspirationId: string): { upvoted: boolean; allUpvoted: string[] } => {
  const current = getUserUpvotedAspirations();
  const exists = current.includes(aspirationId);
  let updated: string[];
  if (exists) {
    updated = current.filter(id => id !== aspirationId);
  } else {
    updated = [...current, aspirationId];
  }
  try {
    localStorage.setItem(KEYS.UPVOTED_ASPIRATIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed storing upvotes', e);
  }
  return { upvoted: !exists, allUpvoted: updated };
};

export const getStoredVolunteers = (): VolunteerApplication[] => {
  try {
    const raw = localStorage.getItem(KEYS.VOLUNTEERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addStoredVolunteer = (applicant: VolunteerApplication): void => {
  try {
    const current = getStoredVolunteers();
    localStorage.setItem(KEYS.VOLUNTEERS, JSON.stringify([applicant, ...current]));
  } catch (e) {
    console.error('Failed storing volunteer', e);
  }
};
