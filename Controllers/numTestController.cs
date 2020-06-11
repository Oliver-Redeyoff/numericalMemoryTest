using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace numericalMemoryTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class numTestController : ControllerBase {
        private readonly ILogger<numTestController> _logger;

        public numTestController(ILogger<numTestController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public int[] Get() {
            // This is where I define the assement, you can change what numbers the user
            // will be tested on here
            int[] test = {1936, 8431, 32242, 73512, 856765, 761314, 1783462, 
            9320373, 47629605, 1945284, 97812853, 124033946, 90988124, 18360462, 
            7361029, 378467361, 467381099, 918235614, 175275345, 1892036477};

            return test;
        }

        [HttpPost]
        public string PostData() {
            return "Data is uploaded";
        }
    }
}
