export default `const [activeName, setActiveName] = createSignal('11');

<div style={{width: '220px', 'border-right': '1px solid var(--ae-color-border)'}}>
    <Menu dir='v' activeName={[activeName, setActiveName]} linkParent>
        <SubMenu name='1' icon={<Icon name='users'/>} title='角色管理'>
            <MenuItem name='11'>添加</MenuItem>
            <MenuItem name='12'>修改</MenuItem>
            <MenuItem name='13'>删除</MenuItem>
        </SubMenu>
        <MenuItem name='2' icon={<Icon name='user'/>}>用户管理</MenuItem>
        <SubMenu name='3' icon={<Icon name='cog'/>} title='系统管理'>
            <MenuItem name='31'>菜单管理</MenuItem>
            <MenuItem name='33'>权限管理</MenuItem>
        </SubMenu>
    </Menu>
    <Button onClick={() => {
        setActiveName('33');
    }}>选中子菜单项</Button>
</div>`
