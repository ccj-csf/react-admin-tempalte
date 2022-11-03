// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageResponse<T> = {
    content: T[]
    number: number
    size: number
    totalPages: number
    totalElements: number
  }

  type CurrentUser = {
    id?: any
    employeeCode?: any
    loginName: string
    userName: string
    orgId: string
    orgName: string
    deptId: string
    deptName: string
    status: number
    gender?: any
    mobile?: any
    officePhone?: any
    email?: any
    address?: any
    birthday?: any
    reporter?: any
    hiredate?: any
    roles?: any
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type Station = {
    id?: string
    name?: string
    type?: string
    parentId?: string
    status?: string
  }

  type Pricing = {
    id: string
    routeId: string
    routeName: string
    containerType: string
    containerTypeDesc: string
    correction: string
    goods: any
    truncDigit: string
    fee: number
    cost: number
    grossProfit: number
    discountTwentyPercent: Price
    discountThirtyPercent: Price
    createdBy?: any
    createdDate?: any
    lastModifiedBy?: any
    lastModifiedDate?: any
  }

  type Price = {
    fee: number
    cost: number
    grossProfit: number
  }

  type Goods = {
    id: string
    name: string
    category: string
    containers: RouteContainer[]
  }

  type Route = {
    id: number
    name: string
    startStationId: number
    startStationName: string
    endStationId: number
    endStationName: string
    status: string
    type: string
    containers: RouteContainer[]
  }

  type RouteContainer = {
    number: string
  }

  type Customer = {
    id: any
    trueName: string
    idCard?: any
    userType: string
    mobile: string
    createdDate: string
    enterpriseName: string
    enterpriseScope?: any
    salesman?: any
    progressStatus?: any
    businessProductCategory: string
    enterpriseEnable: string
    enterpriseId?: number
  }

  type CustomerDetail = {
    customer: CustomerInformation
    enterprises: CustomerEnterprise
  }

  type Salesman = {
    id: string
    ssoAdminId: string
    adminName: string
    adminMobile: string
    enable: string
    type: string
    createdDate: string
    lastModifiedDate: string
    lastModifiedBy?: any
    createdBy?: any
  }

  type CustomerInformation = {
    id: string
    username: string
    avatar: string
    trueName: string
    idCard: string
    idCardFrontSide: string
    idCardBackSide: string
    wxUuid: string
    wxOpenid: string
    userType: string
    mobile: string
    address: string
    gender: string
    businessProductCategory: string
    createdDate: string
    lastModifiedDate: string
    lastModifiedBy?: any
    createdBy?: any
  }

  type CustomerEnterprise = {
    id: string
    enterpriseName: string
    enterpriseCreditCode: string
    enterprisePerson: string
    customerId?: any
    enterpriseScope?: any
    enterpriseLicenseImg?: any
    enterpriseEmail?: any
    establishmentDate?: any
    enterpriseAddress: string
    mobile: string
    registeredCapital?: any
    taxNumber: string
    bankAccount: string
    bankName: string
    enterpriseRegion?: any
    createdDate: string
    lastModifiedDate: string
    lastModifiedBy?: any
    createdBy?: any
    enterpriseAgents: CustomerEnterpriseAgent[]
    enterpriseAttachment: CustomerEnterpriseAttachment[]
  }

  type CustomerEnterpriseAttachment = {
    id: string
    attachmentName: string
    attachmentDesc?: any
    attachmentUrl: string
    enterpriseId: any
    customerId: any
    enable: string
    createdDate: string
    lastModifiedDate: string
    lastModifiedBy?: any
    createdBy?: any
  }

  type CustomerEnterpriseAgent = {
    id: string
    agentName: string
    enterpriseId: any
    agentMobile: string
    agentIdCard: string
    enable: string
    createdDate: string
    lastModifiedDate: string
  }

  type Role = {
    id: string
    name: string
    countOfUser: string
    countOfPermission: string
    description: string
  }

  type RoleDetail = {
    id: string
    name: string
    countOfUser: string
    countOfPermission: string
    description: string
    menus: string[]
    pages: Page[]
  }

  type Page = {
    id: string
    elements: string[]
  }

  type Menu = {
    id: string
    name: string
    pageId: string
    path: string
    parentId: string
    target: string
    icon: string
    children: Menu[]
    elements: Element[]
  }

  type Element = {
    name: string
    readableName: string
  }

  type Order = {
    id: string
    orderNumber: string
    orderStatus: string
    enterpriseName: string
    goodsName: string
    transportWay: string
    startStationName: string
    endStationName: string
    customerMobile: string
    customerName: string
    goodsWeight: number
    goodsUnit: string
    createDate: string
    salesmanName: string
    assessPrice: number
    contractPrice?: number
    currency: string
    extensionFee?: any
    packagingWay?: any
    containerCategory?: any
    containerNum?: any
  }

  type OrderDetail = {
    id: string
    startStationId: string
    startStationName: string
    endStationId: string
    endStationName: string
    goodsId: string
    goodsName: string
    goodsWeight: number
    packagingWay?: any
    containerCategory?: any
    containerNum?: any
    contractPrice: number
    currency: string
    extensionFee?: any
    enterpriseName: string
    customerMobile: string
    customerTrueName: string
    doorToStation?: any
    stationToDoor?: any
    customsLiquidation?: any
    pickContainer?: any
    orderContainer?: any
    createdDate: string
    orderStatus: string
  }

  type Carousel = {}

  type Contact = {
    id: string
    orderNo: string
    templateId?: any
    number: string
    name: string
    description?: any
    signedDate: string
    endDate?: any
    type: string
    status: string
    unitPrice?: any
    actualPrice?: any
    currency: string
    previewUrl: string
    ownerSigned: string
    customerSigned: string
    goodsId: string
    goodsName: string
    salesmanId: string
    salesmanName: string
    customerId: string
    customerName: string
    originalId: string
    originalName: string
    destinationId: string
    destinationName: string
    ownerEnterpriseId: string
    ownerEnterpriseName: string
    ownerEnterprisePerson: string
    ownerAuthName: string
    ownerAuthPhone: string
    ownerAuthIdCard: string
    customerEnterpriseId: string
    customerEnterpriseName: string
    customerEnterprisePerson: string
    customerSignName: string
    customerSignMobile: string
    customerSignIdCard: string
    signFlowId: string
    signFileKey: string
    actionStatus?: any
    createdBy?: any
    createdDate: string
    lastModifiedBy?: any
    lastModifiedDate: string
  }

  type Sign = {
    org?: SignEnterprise
    agents?: SignAgent[]
  }

  type SignEnterprise = {
    address: string
    autoSign: number
    createTime: string
    defaultSeal: number
    defaultSealId?: any
    economicType: string
    legalName: string
    level: number
    licenseNumber: string
    licenseType: number
    membership: string
    message: string
    mobile: string
    modifyTime: string
    organizeId: string
    organizeName: string
    organizeNo: string
    organizeType: number
    parentId: string
    parentNo: string
    postalCode: string
    referred: boolean
    statisticsBy: string
    status: number
    subFlag: number
    success: boolean
    syncCertificates: number
    type: number
    unitNature: string
  }

  export interface SignAgent {
    accountId: string
    email: string
    mobile: string
    name: string
    status: number
    uniqueId: string
  }

  type Train = {
    orderId: string
    orderNumber: string
    contractId: string
    goodsName: string
    goodsId: string
    goodsWeight: number
    goodsAmount: number
    goodsUnit: string
    temperatureRequirements: string
    customerId: string
    trainNumber: string
    departTime: Date
    startStationId: string
    endStationId: string
    items: TrainLoadingItem[]
  }

  type TrainLoadingItem = {
    wagonNo: string
    no: string
    type: string
  }

  type Waybill = {
    orderId: string
    orderNumber: string
    goodsId: string
    goodsName: string
    goodsWeight: number
    startStationId: string
    startStationName: string
    endStationId: string
    endStationName: string
    packagingWay: string
    containerCategory: string
    containerNum: string
    transportWay: string
    orderStatus: string
    assessPrice: number
    contractPrice: number
    currency: string
    extensionFee: string
    salesmanId: string
    contractId: string
    contractCode: string
    contractUrl: string
    contractName: string
    customerId: string
    customerTrueName: string
    customerMobile: string
    customerIdCard: string
    userType: string
    customerEnterpriseId: string
    customerEnterpriseName: string
    customerEnterpriseMobile: string
    scheduleMessage?: any
    waybillNum: number
    loadingStatus: string
  }

  type TrainDetail = {
    orderId: string
    orderCode: string
    contractId: string
    contractCode: string
    goodsId: string
    goodsName: string
    goodsWeight: number
    waybillList: TrainWaybill[]
  }

  type TrainWaybill = {
    waybillId: string
    temperatureRequirements: number
    trainNumber: string
    departTime: string
    startStationName: string
    endStationName: string
    stationLogisticsList: StationLogisticsList[]
    containerList: WaybillContainer[]
  }

  type WaybillContainer = {
    waybillContainerId: string
    containerId: string
    wagonNo: string
    containerCode: string
    typeCode: string
  }

  type StationLogisticsList = {
    recordType: string
    message: string
    stopedStationId: number
    stopedStationName: string
    arriveTime: string
    stationStatus: string
    description: string
    operationList: OperationList[]
  }

  type OperationList = {
    operationCode: string
    operationName: string
    operationTime: string
    message: string
    description: string
    containerList: ContainerEvent[]
  }
  /**
   * 车次
   */
  type TrainSchedule = {
    trainId: string
    startStationName: string
    endStationName: string
    trainNumber: string
    departTime: string
  }
  /**
   * 停靠操作事件
   */
  type StoppedTrainOperation = {
    trainId: string
    stopedStationId: string
    arriveTime: string
    description: string
    operationList: StoppedScheduleOperation[]
  }
  type StoppedScheduleOperation = {
    operationCode: string
    operationTime: string
    description: string
    containerIds: string[]
    containerEvent: ContainerEvent[]
  }
  /**
   * 运输操作事件
   */
  type MovingTrainSchedule = {
    trainId: string
    leftStationId: string
    toArriveStationId: string
    leaveTime: string
    description: string
  }

  type ContainerEvent = {
    containerId: string
    no: string
    typeCode: string
    leaveTime: string
    wagonNo: string
  }

  type TrainEventDetail = {
    scheduleId: string
    recordType: string
    recordtime: string
    message: string
    trainId: string
    description?: any
    stopedStationId: number
    stopedStationName: string
    arriveTime: string
    leftStationId: number
    leftStationName?: any
    leaveTime?: any
    toArriveStationId: number
    toArriveStationName?: any
    operationList: OperationList[]
  }
}
