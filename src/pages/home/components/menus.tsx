import React from 'react';
import { PieChartTwoTone, MailOutlined, ContainerTwoTone, GoldTwoTone, PartitionOutlined, UserOutlined, TeamOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './menus.scss'

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: '/back_way/dash_board',
    label: '数据中心',
    icon: <PieChartTwoTone />
  },
  {
    key: '/back_way/content',
    label: '文章管理',
    icon: <ContainerTwoTone />
  },
  {
    key: '/back_way/merchant',
    label: '商家管理',
    icon: <GoldTwoTone />
  },
  {
    key: '/back_way/complain',
    label: '投诉管理',
    icon: <MailOutlined />
  },
  {
    key: '/back_way/display',
    label: '分类管理',
    icon: <InsertRowBelowOutlined />
  },
  {
    key: '/back_way/user_manage',
    label: '用户管理',
    icon: <TeamOutlined />
  },
  {
    key: '/back_way/role_manage',
    label: '角色管理',
    icon: <PartitionOutlined />
  },
  {
    key: '/back_way/person',
    label: '个人中心',
    icon: <UserOutlined />
  }
]

const LocalMenu: React.FC = () => {
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  return (
    <Menu
      className='menu'
      onClick={onClick}
      style={{ width: '100%', border: 'none' }}
      defaultSelectedKeys={['/back_way/dash_board']}
      mode="inline"
      items={items}
    />
  );
};

export default LocalMenu;