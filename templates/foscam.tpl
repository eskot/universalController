      <div id="{{DEVICE_ID}}" class="device">
        <div class="control-block">
          <div class="presets">
            <ol>
              <li><a href="/?{{DEVICE_ID}}=Preset1"><span>1</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Preset2"><span>2</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Preset3"><span>3</span></a></li>
            </ol>
          </div>
          <div class="navigation">
            <a href="/?{{DEVICE_ID}}=Up" class="fa fa-arrow-up"><span>Up</span></a>
            <a href="/?{{DEVICE_ID}}=Left" class="fa fa-arrow-left"><span>Left</span></a>
            <a href="/?{{DEVICE_ID}}=Stop" class="fa-stack">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-level-up fa-rotate-90"></i>
              <span>Stop</span>
            </a>
            <a href="/?{{DEVICE_ID}}=Right" class="fa fa-arrow-right"><span>Right</span></a>
            <a href="/?{{DEVICE_ID}}=Down" class="fa fa-arrow-down"><span>Down</span></a>
          </div>
          <div class="alarm">
            <ul>
              <li><a href="/?{{DEVICE_ID}}=Preset1,sleep,sleep,AlarmOn" class="fa fa-lock"><span>AlarmOn</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Take" class="fa fa-camera"><span>Take</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=Take,Take,Take,Take,Take" class="fa fa-bolt"><span>Burst</span></a></li>
              <li><a href="/?{{DEVICE_ID}}=AlarmOff,Preset3" class="fa fa-unlock"><span>AlarmOff</span></a></li>
            </ul>
          </div>
        </div>

        <div class="preview-image">
          <img data-src="{{FOSCAM_DYNAMIC}}" alt="{{DEVICE_ID}} Preview" />
        </div>
      </div>
