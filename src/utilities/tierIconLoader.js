import tier1Icon from '../assets/images/tier1.png';
import tier2Icon from '../assets/images/tier2.png';
import tier3Icon from '../assets/images/tier3.png';
import tier4Icon from '../assets/images/tier4.png';
import tier5Icon from '../assets/images/tier5.png';
import tier6Icon from '../assets/images/tier6.png';

const tierIcons = {
  tier1: tier1Icon,
  tier2: tier2Icon,
  tier3: tier3Icon,
  tier4: tier4Icon,
  tier5: tier5Icon,
  tier6: tier6Icon
};

export const loadIcon = (tier) => {
  const tierString = "tier" + tier;
  if (tierIcons.hasOwnProperty(tierString)) {
    return tierIcons[tierString];
  } else {
    return null;
  }
}

export default loadIcon;