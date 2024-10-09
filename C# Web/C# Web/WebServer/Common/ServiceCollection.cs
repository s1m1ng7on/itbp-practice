using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Common
{
    public class ServiceCollection : IServiceCollection
    {
        private readonly Dictionary<Type, Type> _services;

        public ServiceCollection()
            => _services = new Dictionary<Type, Type>();

        public IServiceCollection Add<TService, TImplementation>()
            where TService : class
            where TImplementation : TService
        {
            _services[typeof(TService)] = typeof(TImplementation);

            return this;
        }

        public IServiceCollection Add<TService>() where TService : class
            => Add<TService, TService>();

        public object CreateInstance(Type serviceType)
        {
            if (_services.ContainsKey(serviceType))
                serviceType = _services[serviceType];
            else if (serviceType.IsInterface)
                throw new InvalidOperationException($"Service {serviceType.FullName} is not registered.");

            ConstructorInfo[] constructors = serviceType.GetConstructors();

            if (constructors.Length > 1)
                throw new InvalidOperationException("Multiple constructors are not supported.");

            ConstructorInfo constructor = constructors.First();
            ParameterInfo[] parameters = constructor.GetParameters();

            object[] parameterValues = new object[parameters.Length];
            for (int i = 0; i < parameterValues.Length; i++)
            {
                Type parameterType = parameters[i].ParameterType;
                object parameterValue = CreateInstance(parameterType);

                parameterValues[i] = parameterValue;
            }

            return constructor.Invoke(parameterValues);
        }

        public TService Get<TService>() where TService : class
        {
            Type serviceType = typeof(TService);

            if (!_services.ContainsKey(serviceType))
                return null;

            Type service = _services[serviceType];

            return (TService)CreateInstance(service);
        }
    }
}
