import { Mail, Lock, ArrowRight } from "lucide-react";
import LoginPageViewModel from "./Login.page.viewmodel";

const LoginPage = () => {
  const { setUser, user, handleLogin, isLoading, errors } =
    LoginPageViewModel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryColor via-secondaryColor to-tertiaryColor flex items-center justify-center p-4">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-cyan-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Panel Izquierdo - Formulario */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Bienvenido
                  </h1>
                  <p className="text-blue-200 text-lg">
                    Inicia sesión en tu cuenta
                  </p>
                </div>

                {/* Formulario */}
                <div className="space-y-6">
                  {/* Campo Usuario */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 block">
                      Usuario
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        className="w-full h-12 pl-12 pr-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                        value={user.username}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Campo Contraseña */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100 block">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                      <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="w-full h-12 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </div>
                    {
                      errors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.password}
                        </p>
                      )
                    }
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="text-sm text-accentColor hover:text-cyan-200 transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {/* Botón Login */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:transform-none shadow-lg"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Iniciar Sesión</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Panel Derecho - Bienvenida */}
            <div className="relative bg-gradient-to-br from-blue-600 to-primaryColor-700 p-8 lg:p-12 flex flex-col justify-center text-white overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    ¡Hola!
                  </h2>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-blue-100">
                    Bienvenidos a Datamailing
                  </h3>
                  <p className="text-blue-100 leading-relaxed max-w-sm mx-auto">
                    Plataforma integral para la administración de emails de
                    clientes.
                  </p>
                </div>

                {/* Indicadores de características */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-secondaryColor/90 rounded-full"></div>
                    <span className="text-sm">
                      Análisis de problemas de clientes
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-secondaryColor/90 rounded-full"></div>
                    <span className="text-sm">Segmentación inteligente</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-secondaryColor/90 rounded-full"></div>
                    <span className="text-sm">
                      Automatización personalizada
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
