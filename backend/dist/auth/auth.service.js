"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const categories_service_1 = require("../categories/categories.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, categoriesService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.categoriesService = categoriesService;
    }
    async validateUser(username, pass) {
        console.log('Iniciando la validación del usuario');
        console.log('Username ingresado:', username);
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            console.log('Usuario no encontrado');
            return null;
        }
        console.log('Usuario encontrado:', user.username);
        console.log('Contraseña almacenada en la base de datos (hash):', user.password);
        const isPasswordValid = await bcrypt.compare(pass.trim(), user.password.trim());
        console.log('Contraseña proporcionada:', pass);
        console.log('Resultado de bcrypt.compare:', isPasswordValid);
        if (user && isPasswordValid) {
            console.log('Contraseña correcta. Usuario validado con éxito.');
            return user;
        }
        console.log('Contraseña incorrecta. Validación fallida.');
        return null;
    }
    async login(username, password) {
        console.log('Iniciando el proceso de login');
        const user = await this.validateUser(username, password);
        if (!user) {
            console.log('Login fallido: credenciales inválidas');
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        console.log('Login exitoso. Generando token JWT...');
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        console.log('Token JWT generado:', accessToken);
        return {
            access_token: accessToken,
        };
    }
    async register(username, email, password) {
        console.log('Iniciando el proceso de registro');
        console.log('Datos ingresados:');
        console.log('Username:', username);
        console.log('Email:', email);
        const existingUser = await this.usersService.findByUsername(username);
        const existingEmail = await this.usersService.findByEmail(email);
        if (existingUser) {
            console.log('Registro fallido: el nombre de usuario ya está en uso.');
            throw new common_1.BadRequestException('El nombre de usuario ya está en uso.');
        }
        if (existingEmail) {
            console.log('Registro fallido: el correo electrónico ya está en uso.');
            throw new common_1.BadRequestException('El correo electrónico ya está en uso.');
        }
        console.log('Username y email disponibles. Procediendo a hashear la contraseña.');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña hasheada:', hashedPassword);
        const newUser = await this.usersService.createUser(username, email, hashedPassword);
        console.log('Usuario registrado exitosamente:', newUser);
        await this.categoriesService.createDefaultCategories();
        return newUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        categories_service_1.CategoriesService])
], AuthService);
//# sourceMappingURL=auth.service.js.map