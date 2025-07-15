import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {IApiRequest} from "./toolsApi";
import {Vehicle} from "../data/users/vehicle";
import {VehicleConverter} from "../converters/vehicle-converter";
import {VehicleEditStore} from "../components/compositions/vehicle/edit/vehicle-edit.store";
import {PlaceConverter} from "../converters/place-converter";

export interface IAddVehiclePhotosRequest extends IApiRequest {
    idVehicle: number;
    vehicle: VehicleEditStore;
}
export interface IUpdateVehicleRequest extends IApiRequest {
    vehicle: VehicleEditStore;
}
export interface ISetVehicleVerificationRequest extends IApiRequest {
    vehicleId: number;
    verified: boolean;
}
export interface IAddVehicleRequest extends IApiRequest {
    vehicle: VehicleEditStore;
}
export interface IGetVehicleRequest extends IApiRequest {
    vehicleId: number;
}
export interface IGetVehiclesRequest extends IApiRequest {
}

export class VehicleApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.VehiclesApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async getVehicle(req: IGetVehicleRequest): Promise<Vehicle> {
        const response = await this._api.apiVehiclesVehicleGet({
            idVehicle: req.vehicleId
        }, req.initOverrides);

        return VehicleConverter.toClient(response);
    }

    public async getVehicles(req: IGetVehiclesRequest): Promise<Vehicle[]> {
        const response = await this._api.apiVehiclesGet(req.initOverrides);
        return response.map(VehicleConverter.toClient);
    }

    public async addVehicle(req: IAddVehicleRequest): Promise<number> {
        return await this._api.apiVehiclesVehiclePost({
            addVehicleRequestDto: {
                name: req.vehicle.name,
                euro: req.vehicle.euro,
                handicappedUserCount: req.vehicle.handicappedUserCount,
                amenities: req.vehicle.amenities,
                personsCapacity: req.vehicle.personsCapacity,
                vin: req.vehicle.VIN,
                registrationSign: req.vehicle.registrationSign,
                stkExpired: req.vehicle.stkExpired || new Date(),
                yearOfManufacture: req.vehicle.yearOfManufacture,
                departureStation: req.vehicle.departureStation ? PlaceConverter.toServer(req.vehicle.departureStation) : undefined
            }
        }, req.initOverrides);
    }

    public async addVehiclePhotos(req: IAddVehiclePhotosRequest): Promise<void> {
        await this._api.apiVehiclesPhotosPost({
            id: req.idVehicle,
            frontPhoto: req.vehicle.frontPhoto!.file,
            rearPhoto: req.vehicle.rearPhoto!.file,
            leftSidePhoto: req.vehicle.leftSidePhoto!.file,
            rightSidePhoto: req.vehicle.rightSidePhoto!.file,
            interierPhoto1: req.vehicle.interierPhoto1!.file,
            interierPhoto2: req.vehicle.interierPhoto2!.file,
            technicalCertificate1: req.vehicle.technicalCertificate1!.file,
            technicalCertificate2: req.vehicle.technicalCertificate2!.file,
            insurance: req.vehicle.insurancePhoto!.file
        }, req.initOverrides);
    }

    public async updateVehicle(req: IUpdateVehicleRequest): Promise<void> {
        await this._api.apiVehiclesVehiclePut({
            updateVehicleRequestDto: {
                id: req.vehicle.id,
                name: req.vehicle.name,
                personsCapacity: req.vehicle.personsCapacity,
                euro: req.vehicle.euro,
                amenities: req.vehicle.amenities,
                handicappedUserCount: req.vehicle.handicappedUserCount,
                vin: req.vehicle.VIN,
                registrationSign: req.vehicle.registrationSign,
                stkExpired: req.vehicle.stkExpired || new Date(),
                yearOfManufacture: req.vehicle.yearOfManufacture,
                departureStation: req.vehicle.departureStation ? PlaceConverter.toServer(req.vehicle.departureStation) : undefined
            },
        }, req.initOverrides);
    }

    public async updateVehiclePhotos(req: IUpdateVehicleRequest): Promise<void> {
        return await this._api.apiVehiclesPhotosPut({
            id: req.vehicle.id,
            frontPhoto: req.vehicle.frontPhoto ? (req.vehicle.frontPhoto.path ? undefined : req.vehicle.frontPhoto.file) : undefined,
            rearPhoto: req.vehicle.rearPhoto ? (req.vehicle.rearPhoto.path ? undefined : req.vehicle.rearPhoto.file) : undefined,
            leftSidePhoto: req.vehicle.leftSidePhoto ? (req.vehicle.leftSidePhoto.path ? undefined : req.vehicle.leftSidePhoto.file) : undefined,
            rightSidePhoto: req.vehicle.rightSidePhoto ? (req.vehicle.rightSidePhoto.path ? undefined : req.vehicle.rightSidePhoto.file) : undefined,
            interierPhoto1: req.vehicle.interierPhoto1 ? (req.vehicle.interierPhoto1.path ? undefined : req.vehicle.interierPhoto1.file) : undefined,
            interierPhoto2: req.vehicle.interierPhoto2 ? (req.vehicle.interierPhoto2.path ? undefined : req.vehicle.interierPhoto2.file) : undefined,
            technicalCertificate1: req.vehicle.technicalCertificate1 ? (req.vehicle.technicalCertificate1.path ? undefined : req.vehicle.technicalCertificate1.file) : undefined,
            technicalCertificate2: req.vehicle.technicalCertificate2 ? (req.vehicle.technicalCertificate2.path ? undefined : req.vehicle.technicalCertificate2.file) : undefined,
            insurance: req.vehicle.insurancePhoto ? (req.vehicle.insurancePhoto.path ? undefined : req.vehicle.insurancePhoto.file) : undefined,
        }, req.initOverrides);
    }

    public async setVehicleVerification(req: ISetVehicleVerificationRequest): Promise<void> {
        await this._api.apiVehiclesTransportVerificationPost({
            vehicleTransportVerificationRequestDto: {
                id: req.vehicleId,
                isVerifiedForTransporting: req.verified
            }
        }, req.initOverrides)
    }
}