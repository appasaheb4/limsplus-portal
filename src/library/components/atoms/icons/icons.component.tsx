/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import {IconContext as Context, IconType} from 'react-icons';
import {Icons} from '../..';
import Icon from 'react-eva-icons';

import * as IconRi from 'react-icons/ri';
import * as IconIm from 'react-icons/im';
import * as IconFa from 'react-icons/fa';
import * as IconFc from 'react-icons/fc';
import * as IconGi from 'react-icons/gi';
import * as IconCg from 'react-icons/cg';
import * as IconGr from 'react-icons/gr';
import * as IconBs from 'react-icons/bs';
import * as IconFi from 'react-icons/fi';
import * as Iconmd from 'react-icons/md';
import * as Iconio from 'react-icons/io';
import * as Iconio5 from 'react-icons/io5';
import * as Iconsi from 'react-icons/si';
import * as Iconai from 'react-icons/ai';
import * as Iconvsc from 'react-icons/vsc';
import * as Iconhi from 'react-icons/hi';
import * as IconBi from 'react-icons/bi';
import * as IconTb from 'react-icons/tb';
import * as IconsFa from 'react-icons/fa';

export interface IconsProps {
  size?: string;
  icon?: IconType | any;
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: any;
}

export const IconContext: React.FunctionComponent<IconsProps> = props => {
  return (
    <Context.Provider
      value={{color: props.color || '#fff', size: props.size || '20'}}
    >
      <div onClick={props.onClick && props.onClick} style={props.style}>
        {props.children}
      </div>
    </Context.Provider>
  );
};

export {
  IconRi,
  IconIm,
  IconFa,
  IconFc,
  IconGi,
  IconCg,
  IconGr,
  IconBs,
  IconFi,
  Iconmd,
  Iconio,
  Iconio5,
  Iconsi,
  Iconai,
  Iconvsc,
  Iconhi,
  IconBi,
  IconTb,
  IconsFa,
};

export const getIcons = (icon: string): any => {
  // dashboard
  if (icon === 'Icons.IconRi.RiDashboardFill')
    return Icons.IconRi.RiDashboardFill;
  if (icon === 'Icons.IconRi.RiDashboard3Fill')
    return Icons.IconRi.RiDashboard3Fill;
  // login
  if (icon === 'Icons.IconRi.RiComputerFill')
    return Icons.IconRi.RiComputerFill;
  if (icon === 'Icons.IconGr.GrTooltip') return Icons.IconGr.GrTooltip;
  // collection
  if (icon === 'Icons.IconBs.BsFillCollectionFill')
    return Icons.IconBs.BsFillCollectionFill;
  if (icon === 'Icons.IconIm.ImImages') return Icons.IconIm.ImImages;
  if (icon === 'Icons.IconIm.ImLab') return Icons.IconIm.ImLab;
  if (icon === 'Icons.IconFa.FaUserMd') return Icons.IconFa.FaUserMd;
  if (icon === 'Icons.IconFc.FcDepartment') return Icons.IconFc.FcDepartment;
  if (icon === 'Icons.IconFa.FaLayerGroup') return Icons.IconFa.FaLayerGroup;
  // master
  if (icon === 'Icons.Iconio.IoMdAnalytics') return Icons.Iconio.IoMdAnalytics;
  if (icon === 'Icons.Iconio.IoIosAnalytics')
    return Icons.Iconio.IoIosAnalytics;
  if (icon === 'Icons.IconFa.FaSolarPanel') return Icons.IconFa.FaSolarPanel;
  if (icon === 'Icons.IconFi.FiPackage') return Icons.IconFi.FiPackage;
  if (icon === 'Icons.IconFi.FiPackage') return Icons.IconFi.FiPackage;
  if (icon === 'Icons.Iconsi.SiMinetest') return Icons.Iconsi.SiMinetest;
  if (icon === 'Icons.Iconmd.MdLooks') return Icons.Iconmd.MdLooks;
  if (icon === 'Icons.IconBs.BsGrid3X3') return Icons.IconBs.BsGrid3X3;
  if (icon === 'Icons.Iconai.AiOutlineContainer')
    return Icons.Iconai.AiOutlineContainer;
  if (icon === 'Icons.IconBs.BsBookmarks') return Icons.IconBs.BsBookmarks;
  if (icon === 'Icons.IconFa.FaBuromobelexperte')
    return Icons.IconFa.FaBuromobelexperte;
  if (icon === 'Icons.Iconio.IoIosGitCompare')
    return Icons.Iconio.IoIosGitCompare;
  if (icon === 'Icons.Iconvsc.VscSymbolMethod')
    return Icons.Iconvsc.VscSymbolMethod;
  if (icon === 'Icons.IconGi.GiHospitalCross')
    return Icons.IconGi.GiHospitalCross;
  if (icon === 'Icons.IconRi.RiMap2Line') return Icons.IconRi.RiMap2Line;
  if (icon === 'Icons.IconFi.FiUsers') return Icons.IconFi.FiUsers;
  if (icon === 'Icons.Iconai.AiOutlineSchedule')
    return Icons.Iconai.AiOutlineSchedule;
  if (icon === 'Icons.IconFa.FaAddressCard') return Icons.IconFa.FaAddressCard;
  if (icon === 'Icons.IconRi.RiTeamLine') return Icons.IconRi.RiTeamLine;
  if (icon === 'Icons.Iconai.AiOutlineSolution')
    return Icons.Iconai.AiOutlineSolution;
  if (icon === 'Icons.Iconhi.HiLibrary') return Icons.Iconhi.HiLibrary;
  if (icon === 'Icons.IconGi.GiPriceTag') return Icons.IconGi.GiPriceTag;
  if (icon === 'Icons.Iconvsc.VscReferences')
    return Icons.Iconvsc.VscReferences;

  //communication
  if (icon === 'Icons.IconFa.FaCommentDots') return Icons.IconFa.FaCommentDots;
  if (icon === 'Icons.IconCg.CgCommunity') return Icons.IconCg.CgCommunity;
  if (icon === 'Icons.IconGi.GiConversation')
    return Icons.IconGi.GiConversation;
  if (icon === 'Icons.IconRi.RiGhostSmileLine')
    return Icons.IconRi.RiGhostSmileLine;
  if (icon === 'Icons.IconGi.GiDatabase') return Icons.IconGi.GiDatabase;
  if (icon === 'Icons.IconGi.GiKeyring') return Icons.IconGi.GiKeyring;

  //settings
  if (icon === 'Icons.IconRi.RiSettings5Fill')
    return Icons.IconRi.RiSettings5Fill;
  if (icon === 'Icons.IconFa.FaUsersCog') return Icons.IconFa.FaUsersCog;
  if (icon === 'Icons.IconFi.FiActivity') return Icons.IconFi.FiActivity;
  if (icon === 'Icons.IconRi.RiShieldKeyholeFill')
    return Icons.IconRi.RiShieldKeyholeFill;
  if (icon === 'Icons.IconCg.CgShortcut') return Icons.IconCg.CgShortcut;
  if (icon === 'Icons.Iconmd.MdSettingsInputComponent')
    return Icons.Iconmd.MdSettingsInputComponent;
  if (icon === 'Icons.IconFa.FaClipboardList')
    return Icons.IconFa.FaClipboardList;
  // registration
  if (icon === 'Icons.IconRi.RiUserAddLine') return Icons.IconRi.RiUserAddLine;
  if (icon === 'Icons.IconFa.FaAddressCard') return Icons.IconFa.FaAddressCard;
  if (icon === 'Icons.IconFa.FaRegUser') return Icons.IconFa.FaRegUser;

  // report builder
  if (icon === 'Icons.Iconhi.HiDocumentReport')
    return Icons.Iconhi.HiDocumentReport;
  if (icon === 'Icons.IconRi.RiListSettingsFill')
    return Icons.IconRi.RiListSettingsFill;
  if (icon === 'Icons.IconIm.ImInsertTemplate')
    return Icons.IconIm.ImInsertTemplate;
  // result entry
  if (icon === 'Icons.Iconsi.SiSentry') return Icons.Iconsi.SiSentry;
  if (icon === 'Icons.IconBi.BiCategory') return Icons.IconBi.BiCategory;
  if (icon === 'Icons.IconGi.GiMicroscope') return Icons.IconGi.GiMicroscope;
  if (icon === 'Icons.Iconmd.MdHistoryToggleOff')
    return Icons.Iconmd.MdHistoryToggleOff;
  // patient reports
  if (icon === 'Icons.Iconmd.MdOutlineLibraryBooks')
    return Icons.Iconmd.MdOutlineLibraryBooks;
  if (icon === 'Icons.IconGi.GiRegeneration')
    return Icons.IconGi.GiRegeneration;
  if (icon === 'Icons.Iconmd.MdOutlineDeliveryDining')
    return Icons.Iconmd.MdOutlineDeliveryDining;
  // account-receivable
  if (icon === 'Icons.Iconmd.MdAccountBalance')
    return Icons.Iconmd.MdAccountBalance;
  if (icon === 'Icons.Iconmd.MdAccountBalanceWallet')
    return Icons.Iconmd.MdAccountBalanceWallet;
  if (icon === 'Icons.IconGr.GrTransaction') return Icons.IconGr.GrTransaction;
  if (icon === 'Icons.Iconmd.MdOutlineBatchPrediction')
    return Icons.Iconmd.MdOutlineBatchPrediction;
  if (icon === 'Icons.IconBs.BsReceipt') return Icons.IconBs.BsReceipt;
  if (icon === 'Icons.IconBs.BsPiggyBank') return Icons.IconBs.BsPiggyBank;
  if (icon === 'Icons.IconRi.RiCouponLine') return Icons.IconRi.RiCouponLine;

  //common
  if (icon === 'Icons.IconBs.BsFillTrashFill')
    return Icons.IconBs.BsFillTrashFill;
  if (icon === 'Icons.IconGi.GiCancel') return Icons.IconGi.GiCancel;
  if (icon === 'Icons.Iconmd.MdBackHand') return Icons.Iconmd.MdBackHand;
  if (icon === 'Icons.Iconai.AiOutlineFilePdf')
    return Icons.Iconai.AiOutlineFilePdf;
  if (icon === 'Icons.IconIm.ImFilePdf') return Icons.IconIm.ImFilePdf;
  // validation
  if (icon === 'Icons.IconGr.GrValidate') return Icons.IconGr.GrValidate;
  if (icon === 'Icons.Iconmd.MdOutlineRule') return Icons.Iconmd.MdOutlineRule;
  if (icon === 'Icons.Iconmd.MdOutlineApproval')
    return Icons.Iconmd.MdOutlineApproval;

  return Icons.IconBs.BsList;
};

export const getIconTag = (Icon: any) => {
  return Icon ? <Icon /> : <Icons.IconBs.BsList />;
};

export interface IconProps {
  className?: string;
  type?: 'solid' | 'inverse';
  size?: 'small' | 'medium' | 'large';
  buttonOffset?: boolean;
  small?: boolean;
  icon?: string;
  color?: string;
}

export const EvaIcon: React.FunctionComponent<IconProps> = (
  props: IconProps,
) => {
  return (
    <div className={`${props.className}`}>
      <Icon
        name={props.icon}
        size={props.size} // small, medium, large, xlarge
        animation={{
          type: 'pulse', // zoom, pulse, shake, flip
          hover: true,
          infinite: false,
        }}
        fill={props.color}
      />
    </div>
  );
};
