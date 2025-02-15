import {Platform} from 'react-native';
import {ColorsType} from 'types/themeTypes';

export const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export enum imagePlaceHolder {
  PERSON = require('../assets/images/person_placeholder.png'),
  MOVIE = require('../assets/images/movie_placeholder.png'),
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const movieDetailsFilter = (colors: ColorsType) => [
  {
    keypath: 'Cut.Group 5.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Cut.Group 6.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Cut.Group 7.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Cut.Group 8.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 23.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 24.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 25.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 26.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 27.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 28.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 29.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 30.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'Movie.Group 31.Fill 1',
    color: colors.secondary500,
  },
];

export const castMemberFilter = (colors: ColorsType) => [
  {
    keypath: 'icon-man Outlines.pescoco',
    color: colors.secondary500,
  },
  {
    keypath: 'icon-man Outlines.circle-purple 2.Stroke 1',
    color: colors.secondary500,
  },
  {
    keypath: 'icon-man Outlines.hair.Group 2.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'icon-man Outlines.cara.head.Fill 1',
    color: colors.secondary500,
  },
  {
    keypath: 'icon-man Outlines.cara.orelha-d',
    color: colors.secondary500,
  },
  {
    keypath: 'icon-man Outlines.cara.orelha-e',
    color: colors.secondary500,
  },
];

export const ContactUsMessage = (email: string | null | undefined) => {
  return `Hello Movies Corn Support Team,

I hope this message finds you well. I am reaching out to report an issue/suggest an improvement/ask a question (choose one). Here are the details:

---

App Information:
  - App Name: Movie Corn
  
  - Platform: ${Platform.OS}

Issue/Request Details:
  - Subject: [Brief description of the issue or request, e.g., "Problem with favorite movies feature."]
  
  - Description: [Provide detailed information about the issue or suggestion. For example, "The app crashes when I try to add a movie to my favorites. This occurs after I update to the latest version."]

User Information:
  - Name: ${email?.split('@')[0]}
  
  - Email: ${email}
  
  - Time of Encounter (if reporting an issue): ${new Date().toLocaleString()}

---

Thank you for your time and support. Please let me know if you need any further details or clarification.

Best regards,  
[Your Name]`;
};
