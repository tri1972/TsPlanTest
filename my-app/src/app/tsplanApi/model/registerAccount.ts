/**
 * TsPlanning
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface RegisterAccount { 
    /**
     * 登録パスワード
     */
    password?: string;
    /**
     * 登録ユーザ名
     */
    userName?: string;
    /**
     * 登録ハッシュ値
     */
    readonly hashValueRegisted?: string;
}