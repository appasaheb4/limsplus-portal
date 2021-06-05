import React from "react"
import { IconContext as Context, IconType } from "react-icons"
import * as LibraryComponents from "@lp/library/components"

import * as IconRi from "react-icons/ri"
import * as IconIm from "react-icons/im"
import * as IconFa from "react-icons/fa"
import * as IconFc from "react-icons/fc"
import * as IconGi from "react-icons/gi"
import * as IconCg from "react-icons/cg"
import * as IconGr from "react-icons/gr"
import * as IconBs from "react-icons/bs"
import * as IconFi from "react-icons/fi"
import * as Iconmd from "react-icons/md"
import * as Iconio from "react-icons/io"
import * as Iconsi from "react-icons/si"

export interface IconsProps {
  size?: string
  icon?: IconType | any
  color?: string
}

export const IconContext: React.FunctionComponent<IconsProps> = (props) => {
  return (
    <Context.Provider
      value={{ color: props.color || "#fff", size: props.size || "20" }}
    >
      <div>{props.children}</div>
    </Context.Provider>
  )
}

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
  Iconsi
}

export const getIcons = (icon: string): any => {
  // dashboard
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiDashboardFill")
    return LibraryComponents.Atoms.Icons.IconRi.RiDashboardFill
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiDashboard3Fill")
    return LibraryComponents.Atoms.Icons.IconRi.RiDashboard3Fill
  // login
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiComputerFill")
    return LibraryComponents.Atoms.Icons.IconRi.RiComputerFill
  if (icon === "LibraryComponents.Atoms.Icons.IconGr.GrTooltip")
    return LibraryComponents.Atoms.Icons.IconGr.GrTooltip
  // collection
  if (icon === "LibraryComponents.Atoms.Icons.IconBs.BsFillCollectionFill")
    return LibraryComponents.Atoms.Icons.IconBs.BsFillCollectionFill
  if (icon === "LibraryComponents.Atoms.Icons.IconIm.ImImages")
    return LibraryComponents.Atoms.Icons.IconIm.ImImages
  if (icon === "LibraryComponents.Atoms.Icons.IconIm.ImLab")
    return LibraryComponents.Atoms.Icons.IconIm.ImLab
  if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaUserMd")
    return LibraryComponents.Atoms.Icons.IconFa.FaUserMd
  if (icon === "LibraryComponents.Atoms.Icons.IconFc.FcDepartment")
    return LibraryComponents.Atoms.Icons.IconFc.FcDepartment
  if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaLayerGroup")
    return LibraryComponents.Atoms.Icons.IconFa.FaLayerGroup
  // master
  if (icon === "LibraryComponents.Atoms.Icons.Iconio.IoMdAnalytics")
    return LibraryComponents.Atoms.Icons.Iconio.IoMdAnalytics
  if (icon === "LibraryComponents.Atoms.Icons.Iconio.IoIosAnalytics")
    return LibraryComponents.Atoms.Icons.Iconio.IoIosAnalytics
    if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaSolarPanel")
    return LibraryComponents.Atoms.Icons.IconFa.FaSolarPanel
    if (icon === "LibraryComponents.Atoms.Icons.IconFi.FiPackage")
    return LibraryComponents.Atoms.Icons.IconFi.FiPackage
    if (icon === "LibraryComponents.Atoms.Icons.IconFi.FiPackage")
    return LibraryComponents.Atoms.Icons.IconFi.FiPackage
    if (icon === "LibraryComponents.Atoms.Icons.Iconsi.SiMinetest")
    return LibraryComponents.Atoms.Icons.Iconsi.SiMinetest
  //communication
  if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaCommentDots")
    return LibraryComponents.Atoms.Icons.IconFa.FaCommentDots
  if (icon === "LibraryComponents.Atoms.Icons.IconCg.CgCommunity")
    return LibraryComponents.Atoms.Icons.IconCg.CgCommunity
  if (icon === "LibraryComponents.Atoms.Icons.IconGi.GiConversation")
    return LibraryComponents.Atoms.Icons.IconGi.GiConversation
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiGhostSmileLine")
    return LibraryComponents.Atoms.Icons.IconRi.RiGhostSmileLine
  if (icon === "LibraryComponents.Atoms.Icons.IconGi.GiDatabase")
    return LibraryComponents.Atoms.Icons.IconGi.GiDatabase
  //settings
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiSettings5Fill")
    return LibraryComponents.Atoms.Icons.IconRi.RiSettings5Fill
  if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaUsersCog")
    return LibraryComponents.Atoms.Icons.IconFa.FaUsersCog
  if (icon === "LibraryComponents.Atoms.Icons.IconFi.FiActivity")
    return LibraryComponents.Atoms.Icons.IconFi.FiActivity
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiShieldKeyholeFill")
    return LibraryComponents.Atoms.Icons.IconRi.RiShieldKeyholeFill
  if (icon === "LibraryComponents.Atoms.Icons.IconCg.CgShortcut")
    return LibraryComponents.Atoms.Icons.IconCg.CgShortcut
  if (icon === "LibraryComponents.Atoms.Icons.Iconmd.MdSettingsInputComponent")
    return LibraryComponents.Atoms.Icons.Iconmd.MdSettingsInputComponent
  if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaClipboardList")
    return LibraryComponents.Atoms.Icons.IconFa.FaClipboardList
  // registration
  if (icon === "LibraryComponents.Atoms.Icons.IconRi.RiUserAddLine")
    return LibraryComponents.Atoms.Icons.IconRi.RiUserAddLine
  if (icon === "LibraryComponents.Atoms.Icons.IconFa.FaAddressCard")
    return LibraryComponents.Atoms.Icons.IconFa.FaAddressCard

  return LibraryComponents.Atoms.Icons.IconBs.BsList
}

export const getIconTag = (Icon: any) => {
  return Icon ? <Icon /> : <LibraryComponents.Atoms.Icons.IconBs.BsList />
}
